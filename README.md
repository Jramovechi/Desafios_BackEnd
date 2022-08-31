# Desafios_BackEnd
Repositorios con desafíos de curso de Backend-CoderHouse


### Ejecutar con Node

En la terminal, estar parados en la carpeta donde esta el 
archivo que queremos ejecutar. (Suponiendo que el archivo
se llama main.js)

```shell
node index.js
```

## NPM

### Que es NPM?

NPM es el administrador de paquetes de NodeJS y nos sirve 
para instalar las librerias o dependencias que tenga
nuestro proyecto.

### Comandos de NPM

#### Crear proyecto con NPM

```
npm init           Create a package.json file
                   [--force|-f|--yes|-y|--scope]
                   [-y] es para iniciativas el servidor y que no haga las preguntas sobre autor y demás
```

#### Instalar Dependencias
```
npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
                   [-g] (instalar dependencias global)
                   @version (1.0.0 o latest)
```

#### Ejecutar o testear con NPM
```
npm run <foo>      run the script named <foo>
npm test           run this project's tests
```

#### Actualizar todas las librerías de tu proyecto que sean compatibles
```
npm update -save
```

#### Eliminar paquete local
```
npm rm [nombreDelPaquete]
npm uninstall [nombreDelPaquete]
```
#### Eliminar paquete de forma global
```
npm rm -g [nombreDelPaquete]
npm uninstall -g [nombreDelPaquete]
```


