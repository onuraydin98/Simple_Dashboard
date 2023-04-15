How to run project properly:

- First go "remix_app" folder, open VS terminal
- Run "npm install" command to install packages for project
- Check all packages downloaded properly (include tailwind)
- Run "npm run dev" command to start project
- Navigate "https://localhost:yourPortNumber" to see project

Some updates about project:

- In fetch function I needed to modify provided JSON file, because JSON.parse did not work properly due to the extra commas. Please be aware when you changing JSON file. You can see comment about that in "models => dashboard.server.tsx"
- Grid system is used in the project for responsive design, (much more control for different screen sizes)
- UI updated when user refresh the site.
