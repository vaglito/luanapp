# luanapp - Web ecommerce
UI and UX corporacion luana web on NextJS

## Getting Started

First, run the development server:

```bash
npm install
# or 
npm i
# run server in dev mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project structure
```
luanapp/
│── .env.local                  # Variables de entorno locales
│── next.config.js              # Configuración de Next.js
│── tsconfig.json               # Configuración de TypeScript
│── package.json
│── public/                     # Archivos estáticos accesibles desde /
│   └── images/
│
├── src/
│   ├── app/                    # App Router (páginas, layouts y routing)
│   │   ├── layout.tsx          # Layout global
│   │   ├── page.tsx            # Página principal "/"
│   │   ├── (auth)/             # Agrupador de rutas (ej: login, register)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (shop)/             # Agrupador para tienda
│   │   │   ├── products/page.tsx
│   │   │   ├── products/[id]/page.tsx
│   │   │   └── categories/[slug]/page.tsx
│   │   └── api/                # Rutas API (Next.js API routes si las necesitas)
│   │       └── auth/[...nextauth]/route.ts
│   │
│   ├── components/             # Componentes reutilizables UI
│   │   ├── ui/                 # Botones, inputs, modales, etc.
│   │   ├── layout/             # Navbar, Sidebar, Footer, etc.
│   │   └── products/           # Componentes específicos de productos
│   │
│   ├── hooks/                  # Custom hooks (ej. useAuth, useCart)
│   │
│   ├── lib/
|   |   |── api/                   # Utilidades, helpers, funciones de API
│   │   |   ├── apis.ts              # Funciones fetch a tu backend
│   │   └── auth.ts             # Helpers para NextAuth o JWT
│   │
│   ├── store/                  # Estado global (Zustand, Redux, etc.)
│   │   └── cart.ts
│   │
│   ├── styles/                 # Estilos globales (CSS/SCSS/Tailwind config)
│   │   └── globals.css
│   │
│   └── types/                  # Tipos TypeScript compartidos
│       ├── product.ts
│       └── user.ts
│
└── prisma/                     # (opcional) si usas Prisma como ORM
    └── schema.prisma
```


## Deploy on PM2

This explains how to deploy luanapp applications using PM2 to manage process on a server.

### Prerequisites
* A linux server (e.g Ubuntu on [DigitalOcean]((https://www.digitalocean.com/)))
* Node.js and npm installed.
* PM2 installed globally - [how make install PM2 globally](https://pm2-io.translate.goog/docs/runtime/guide/installation/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc)
* Next.js set up and running in a development environment

### Building the Next.js Application
before deploying the application, you need to build it:

```bash
# Install dependencies
npm install 
# or
npm i
# Generete optimized production files
npm run build
# or
npx next build # recommended
```

### Creating the PM2 Configuration file
create an `ecosystem.config.js` file in the root of project with the following content:

```js
module.exports = {
  apps: [
    {
      name: "luanapp", // Process name in PM2
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000 // Change the port if needed
      }
    }
  ]
};
```

### Starting the Application with PM2
Run the following command to start the application:
```bash
pm2 startup
```
This command will generate a system-specific command. Execute it to enable auto-start.

Then, save the PM2 process list:
```bash
pm2 save
```

### Monitoring and Managing the Application
* View the list proccess:
  ```bash
  pm2 list
  ```
* View real-time logs:
  ```bash
  pm2 logs
  ```
* Restart the application:
  ```bash
  pm2 restart <app-name>
  ```
* Stop the application
  ```bash
  pm2 stop <app-name>
  ```
* Remove the application from PM2
  ```bash
  pm2 delete <app-name>
  ```

### Additional Configuration (Opcional)
If you're a reverse proxy like Nginx, configure a server block to redirect traffic to your Next.js application on port 3000.

Example Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
After editing the configuration, restart nginx:
```bash
sudo systemctl restart nginx
```
By following these steps, your Next.js application will be running in production using PM2 for process management, ensuring stability and automatic restarts in case of failures.