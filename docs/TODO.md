# TODO

- [ ] Don't support passing HTML as props?
  This doesn't work:
    <div content="{{ `<div><slot></slot></div>` }}">

- [ ] This works:
  logo="{{
    { asset: { url: '/base/img/logo.png' }}
  }}"

  but this doesn't, space is needed after second bracket:

  logo="{{{
    asset: { url: '/base/img/logo.png' }
  }}}"

- [ ] Map on components can be useful:
  <card map="item of items">


-----------

Nothing to do :)
