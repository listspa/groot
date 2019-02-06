GRooT is our internal library of angular components and styles, designed to 
provide the commonly used components that you need in an enterprise web app.

# Usage

## Create project

First install the angular cli (https://cli.angular.io/) version 7 or above.
Then, to create the project foo:

```
ng new foo
```

## Add our private npm repo

Since our library is not public, we only publish it to a private npm repo.
To access it create, alongside the `package.json` file, a new `.npmrc` file 
with this content:

```
@listspa:registry=http://192.168.232.41:4873
//192.168.232.41:4873/:_authToken="vWULAixCByFhf15uM00ctA=="
```

## Install

You can now install the library and the required dependencies:
 
```
npm install @listspa/groot @ngx-translate/core bootstrap ngx-bootstrap font-awesome filesize
```

## Css

In your app's `style.scss` file you need start with:

```
$groot-assets-base-dir: '~@listspa/groot/assets';
@import "~@listspa/groot/style/groot";
```

## App module

In your app module, in the imports section, add our module and the required libraries:

```
  imports: [
    BrowserModule,
    ...,
    TranslateModule.forRoot(),
    GrootModule.forRoot()
  ],
```
