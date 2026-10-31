(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem(k);
        return v ? JSON.parse(v) : d;
      } catch {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch {}
    },
  };

  // ---------- theme ----------
  const root = document.documentElement;
  $('#theme')?.addEventListener('click', () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try {
      localStorage.setItem('lp-theme', root.dataset.theme);
    } catch {}
  });

  let searching = false;

  // ---------- favorites & recents ----------
  let favs = store.get('lp-favs', []);
  let recents = store.get('lp-recent', []);
  const sourceCard = (id) => $(`.cat-sec .card[data-id="${id}"]`) || $(`.card[data-id="${id}"]`);

  function renderPersonal() {
    const fill = (secId, gridId, ids) => {
      const sec = $(secId);
      if (!sec) return;
      const grid = $(gridId);
      grid.replaceChildren(
        ...ids
          .map(sourceCard)
          .filter(Boolean)
          .map((c) => c.cloneNode(true)),
      );
      sec.hidden = !grid.children.length || searching;
    };
    fill('#mine', '#mine-grid', favs);
    fill('#recent', '#recent-grid', recents);
    $$('[data-fav]').forEach((b) => {
      const on = favs.includes(b.dataset.fav);
      b.setAttribute('aria-pressed', on);
      b.classList.toggle('on', on);
    });
  }

  document.addEventListener('click', (e) => {
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      const id = fav.dataset.fav;
      favs = favs.includes(id) ? favs.filter((x) => x !== id) : [id, ...favs];
      store.set('lp-favs', favs);
      renderPersonal();
      return;
    }
    const visit = e.target.closest('[data-visit]');
    if (visit) {
      const id = visit.dataset.visit;
      recents = [id, ...recents.filter((x) => x !== id)].slice(0, 8);
      store.set('lp-recent', recents);
      // Re-render after navigation starts so the clicked card isn't yanked away.
      setTimeout(renderPersonal, 300);
    }
  });
  $('#clear-recent')?.addEventListener('click', () => {
    recents = [];
    store.set('lp-recent', recents);
    renderPersonal();
  });

  // ---------- search & filters ----------
  const input = $('#q');
  const filterState = new Set();
  const onHome = !!$('#featured');

  function apply() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    searching = terms.length > 0 || filterState.size > 0;
    let shown = 0;
    $$('.cat-sec').forEach((sec) => {
      let n = 0;
      $$('.card', sec).forEach((card) => {
        const s = card.dataset.s;
        const ok =
          terms.every((t) => s.includes(t) || (t === '免费' && card.dataset.price !== 'paid')) &&
          (!filterState.has('cn') || card.hasAttribute('data-cn')) &&
          (!filterState.has('free') || card.dataset.price !== 'paid') &&
          (!filterState.has('oss') || card.hasAttribute('data-oss'));
        card.hidden = !ok;
        if (ok) n++;
      });
      sec.hidden = n === 0;
      shown += n;
    });
    const featured = $('#featured');
    if (featured) featured.hidden = searching;
    $('.own')?.toggleAttribute('hidden', searching);
    const empty = $('#empty');
    if (empty) empty.hidden = shown > 0;
    renderPersonal();
  }

  if (input) {
    const params = new URLSearchParams(location.search);
    if (params.get('q')) input.value = params.get('q');
    // Pages with tool lists filter in place; tool detail pages submit the search to the home page.
    if ($('.cat-sec')) {
      input.form.addEventListener('submit', (e) => {
        e.preventDefault();
        apply();
      });
      input.addEventListener('input', () => {
        apply();
        if (onHome) {
          const url = new URL(location.href);
          input.value ? url.searchParams.set('q', input.value) : url.searchParams.delete('q');
          history.replaceState(null, '', url);
        }
        if (input.value && onHome) window.scrollTo({ top: Math.min(window.scrollY, $('.layout').offsetTop - 70) });
      });
    }
    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.blur();
      }
    });
  }

  $$('[data-filter]').forEach((chip) =>
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      filterState.has(f) ? filterState.delete(f) : filterState.add(f);
      chip.setAttribute('aria-pressed', filterState.has(f));
      apply();
    }),
  );

  // ---------- category scrollspy (home) ----------
  const navLinks = $$('.cats a[data-nav]');
  if (onHome && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          navLinks.forEach((a) => a.classList.toggle('on', a.dataset.nav === en.target.id));
        }
      },
      { rootMargin: '-80px 0px -70% 0px' },
    );
    $$('#featured, .cat-sec').forEach((s) => io.observe(s));
  }

  // Hide broken self-hosted icons so the letter fallback shows.
  $$('.logo img').forEach((img) => {
    const kill = () => img.remove();
    if (img.complete && !img.naturalWidth) kill();
    else img.addEventListener('error', kill);
  });

  if (input?.value || filterState.size) apply();
  else renderPersonal();
})();
