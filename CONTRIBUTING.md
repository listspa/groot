# Contributing to Groot

At the moment we have not formalized a contribution agreement; however feel free to open a
pull request if you have any enhancements or bug fixes and we'll sort something out. :-)


## First step

After the project checkout, as usual, run `npm install`.

## Code structure

The repo is divided in two angular projects: one is the `groot` library 
itself, and the other `groot-tester` is a simple application which we
can use to demo and test the components. 

## Working locally

To work locally simply run `npm run start`. This launches the test application. 

## Public API

Note that, whenever you add a file, component, service, pipe etc that needs to be
in the "public API" of the library you need to add it to the `public_api.ts` file
as well. Otherwise it will not be available to the library's clients.

## Making a release

First, update the release notes in `homepage.component.ts`. Afterwards, simply run `npm run release`
and answer the questions when prompted. To do a pre-release (because you need to test it in another
project), simply enter something like "0.13.0-alpha.0".

The script will automatically create a git tag for every release. To do an hotfix, the procedure is:

- create a branch v0.12.4-hotfix
- commit your fixes (ideally) on the master and cherry-pick them on the branch, or vice-versa
- do a release such as 0.12.4-hotfix.0 on your branch

## CI server

At the moment we use the built-in continuous integration that comes with GitLab, in List's internal instance.
Every push automatically launches a build. The build launches Angular's unit tests.

## CSS

Note that we cannot use the specific component css files. This is because we want 
to allow users to "skin" the groot components, by redefining variables such as $primary.
If we used the specific `component.scss` file, that css would be built at groot's build
time. But that would mean that the variable's value would be groot's default, not the
one to use at runtime.
Therefore, place component's css files in `style/components/_myComponent.scss`.

# Doing a release

Currently, only developers at LIST can create releases.

Create an account on NPM.JS and contact Paolo Inaudi <p.inaudi@list-group.com> to be added
to the `listgroup` organization on NPM.

Next, you have to do an `npm login` using your account in the terminal.

Finally, simply run `npm run release`. If you are a member of LIST, you will need to _temporarily_
remove the row `@listgroup:registry=https://artifactory.list-group.com/artifactory/api/npm/npm/`
from your file `~/.npmrc` and restore it after publication.
