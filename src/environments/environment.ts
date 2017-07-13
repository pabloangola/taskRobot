// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDoUcb3PlbjLCNIPLGPEawDvR2VF1M_qSY',
    authDomain: 'taxrobot-51cb8.firebaseapp.com',
    databaseURL: 'https://taxrobot-51cb8.firebaseio.com',
    projectId:'taxrobot-51cb8',
    storageBucket: 'taxrobot-51cb8.appspot.com',
    messagingSenderId: '77352207070'
  }
};
