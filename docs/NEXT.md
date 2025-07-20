For if else map we can use strings, with alternative syntax:

<div if="projects.length > 4">
<div if="${projects.length > 4}">

<div map="project, i of projects">
<div map="${{of: projects, as: 'project', index: 'i'}}">

<div map="project of projects">
<div map="${{of: projects, as: 'project'}}">

Then the user can choose styles.
