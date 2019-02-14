After the project checkout, as usual, run `npm install`.

# Code structure

The repo is divided in two angular projects: one is the `groot` library 
itself, and the other `groot-tester` is a simple application which we
can use to demo and test the components. 

# Working locally

To work locally simply run `npm run start`. This launches the test application. 

# Public API

Note that, whenever you add a file, component, service, pipe etc that needs to be
in the "public API" of the library you need to add it to the `public_api.ts` file
as well. Otherwise it will not be available to the library's clients.

# Making a release

Simply run `npm run release` and answer the questions when prompted.

# CI server

We use the built-in continuous integration that comes with GitLab. Every push 
automatically launches a build, which you can see [on gitlab](https://gitlab.list-group.com/isp-bu/libs/isp.groot/pipelines).

The build launches angular's unit tests.

# CSS

Note that we cannot use the specific component css files. This is because we want 
to allow users to "skin" the groot components, by redefining variables such as $primary.
If we used the specific `component.scss` file, that css would be built at groot's build
time. But that would mean that the variable's value would be groot's default, not the
one to use at runtime.
Therefore, place component's css files in `style/components/_myComponent.scss`.
