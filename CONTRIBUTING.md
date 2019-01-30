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

You need to do three things:

- in `projects/groot/package.json` update the `version` to `xxx`
- run `npm run package`
- run `npm publish dist/groot/list-groot-xxx.tgz`

TODO: We should find a way to automate everything with something like "npm run publish:snapshot" or similar.
