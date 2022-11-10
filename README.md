## Development

1. Run `npm start` from the root directory.
2. The application will open at `http://localhost:3000/to-do-app-frontend`. If you are not logged in, the authentication will route to a login form, which redirects back to the above URL.
3. Commit changes to the `main` branch, and build/deploy from the `gh-pages` branch.

## Deployment

<!-- TODO: Work out how I set up the flow of subdirectory pushed to gh-pages, and branch structure -->

1. Run `npm run predeploy`, then `npm run deploy`.

`git subtree push --prefix build origin gh-pages`
