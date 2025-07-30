I have some features that needs testing, but I need a matrix of all the different combinations.

It's a template library for HTML that supports attributes for if elsif else, it has slot tags for components, you can pass props to components, and it has a map-attribute for loops

What are all the different combinations of this, max 3 levels deep. I need it in a simple list format similar to this (also invalid combinations should be listed). map can have if, but not elsif or else. slot cannot have anything on it, but it can have fallback content.

- if
- if if
- if if if
- if else
- map if

etc...

---

Complete combination list, max 3 levels deep, including valid and invalid cases as specified:

---

**Valid combinations:**

* if
* if if
* if if if
* if else
* if if else
* if else if
* if else if if
* if if else if
* if if else if if
* map
* map if
* map if if
* map if else
* map if else if
* map if if else
* component
* component with props
* component with props if
* component with props if else
* component with props map
* component with props map if
* component with props map if else
* slot
* slot fallback content
* if component
* if component with props
* if component with props if
* if component with props map
* if slot
* if slot fallback content
* map component
* map component with props
* map component with props if
* map slot
* map slot fallback content

---

**Invalid combinations:**

* map elsif
* map else
* map if elsif
* map if else if
* map if elsif else
* slot if
* slot else
* slot elsif
* slot map
* slot component
* slot with any attribute
* map slot with if
* component with slot attribute
* map if elsif
* component map elsif
* if map elsif
* if elsif
* elsif (without preceding if)
* else (without preceding if)
