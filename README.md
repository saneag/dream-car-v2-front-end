# Dream Car frontend

Production is built with `npm ci` and `npm run build`, then served by Nginx.
The Docker build sets `REACT_APP_API_URL=/api/`, keeping requests and uploaded
images on the same public origin. Development can set this variable in an
ignored `.env` file to a local API address with a trailing slash.

Keep this checkout beside `dream-car-v2-back-end`. Deployment, PostgreSQL data migration,
private settings, and the one-command server launcher are documented in the
[backend deployment guide](https://github.com/saneag/dream-car-v2-back-end/blob/master/DEPLOYMENT.md).
