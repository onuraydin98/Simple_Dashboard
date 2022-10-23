# iftrue_project
Iftrue Frontend Project

Hello, please be sure read carefully below explanations before starting project =>

How to run project properly:

- First go "remix_app" folder, open VS terminal
- Run "npm install" command to install packages for project
- Check all packages downloaded properly (include tailwind)
- Run "npm run dev" command to start project
- Navigate "https://localhost:yourPortNumber" to see project

Some conflicts and updates about project:

- In Windows OS, remix.js gives "hydrate" errors in console in Google Chrome. My research shows that multiple reasons can cause this error. Still, project renders with client side document
- In MacOS, I do not see any console errors like "hydration match error", project runs properly
- Google Chrome shows project's responsiveness properly
- In fetch function I needed to modify provided JSON file, because JSON.parse did not work properly due to the extra commas. Please be aware when you changing JSON file. You can see comment about that in "models => dashboard.server.tsx"
- Grid system is used in the project for responsive design, (much more control for different screen sizes)
- UI updated when user refresh the site.
