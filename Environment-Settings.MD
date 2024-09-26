# Instalación de Herramientas para Node.js y NestJS

## Requisitos Previos

Antes de comenzar, asegúrate de tener acceso a una terminal o línea de comandos en tu sistema operativo. También es recomendable tener permisos de administrador para algunas de las instalaciones.

## 1. Instalación de Node.js

NestJS se basa en Node.js, por lo que necesitarás instalarlo primero.

### Windows

1. **Descargar el Instalador:**
   - Ve a la [página oficial de Node.js](https://nodejs.org/) y descarga el instalador para Windows (elige la versión LTS para estabilidad).

2. **Ejecutar el Instalador:**
   - Haz doble clic en el archivo descargado y sigue las instrucciones del asistente de instalación. Asegúrate de seleccionar la opción para agregar Node.js a tu `PATH`.

3. **Verificar la Instalación:**
   - Abre una terminal (CMD o PowerShell) y ejecuta:
     ```bash
     node -v
     npm -v
     ```

### Linux

1. **Usar el Gestor de Paquetes:**
   - Abre una terminal y ejecuta:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```

2. **Verificar la Instalación:**
   - Ejecuta:
     ```bash
     node -v
     npm -v
     ```

3. **Si necesitas la última versión:**
   - Puedes usar `nvm` (Node Version Manager) para instalar y gestionar múltiples versiones de Node.js:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
     source ~/.bashrc
     nvm install --lts
     ```

### macOS

1. **Usar Homebrew (si está instalado):**
   - Abre una terminal y ejecuta:
     ```bash
     brew install node
     ```

2. **Verificar la Instalación:**
   - Ejecuta:
     ```bash
     node -v
     npm -v
     ```

3. **Alternativa usando nvm:**
   - Instala `nvm`:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
     source ~/.bashrc
     nvm install --lts
     ```

## 2. Instalación de NestJS CLI

Después de instalar Node.js, puedes instalar NestJS CLI globalmente.

### Todos los Sistemas Operativos

Abre una terminal y ejecuta el siguiente comando:
```bash
npm install -g @nestjs/cli
```

## 3. Instalación de TypeScript

TypeScript es el lenguaje principal utilizado en NestJS. Puedes instalarlo globalmente utilizando npm.

### Todos los Sistemas Operativos

Ejecuta el siguiente comando en la terminal:
```bash
npm install -g typescript
```


### Todos los Sistemas Operativos

Ejecuta el siguiente comando para verificar que todo está instalado correctamente:
```bash
nest --version
```

## Puedes continuar con la información de la [documentación de la API](./README.md)
