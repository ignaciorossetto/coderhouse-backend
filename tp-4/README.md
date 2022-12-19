CORRECCIONES DEL TP ANTERIOR:

    1-  ELIMINE LOS TRY/CATCH DE LAS RUTAS

    2-  ELIMINE LOS LOGS EN LOS RETURNS

    3-  ESTANDARICE LOS RESPONSE:
        - RES.JSON EN LA RUTA DE PRODUCTS Y CARTS
        - RES.RENDER EN LA RUTA VIEWS

    4-  CORREGI LA FUNCION ADDPRODUCT: SI EL CODIGO ESTA REPETIDO TIRA ESE ERROR.

    5-  CON RESPECTO A UPDATE PRODUCT:
        HACEN FALTA ESAS VALIDACIONES? CUANDO TRABAJEMOS CON MONGO NO SE PUEDE CONFIGURAR QUE VARIABLES SON MUTABLES Y CUALES NO? 
    
    6- CART: NO TUVE TIEMPO DE REVISAR LA LOGICA PERO LO VOY A HACER DE CERO EN ESTOS DIAS PARA INTENTAR OPTIMIZARLO.



DUDAS: 

1 - Cuando enviaba la info como esta aca abajo llegaba un objeto vacio al endpoint...(De la forma actual llega perfecto)

const form = document.getElementById('form')
const formData = new FormData(form)
const response = await axios.post('http://localhost:8080/api/products/', formData)


2- Hice las comunicaciones de dos maneras:

    A) En handleCreateButton (realTimeProducts.js):
        Hice un axios.post, dispare socket que devuelve un io.emit con
        la lista de productos

    B) En handleDeleteButton (realTimeProducts.js):
        En vez de pegarle al endpoint axios.delete('http...', id),
        pase el id por socket, y a traves del manager borre el producto
        finalmente devuelve un io.emit de la lista de productos
    
    C) No hice esto: importar io en las rutas y en cada hit a un endpoint disparo 
    un io.emit con la lista de productos??


    Cual deberia usar??
    En un ecommerce real, se usa? Lo podria usar para el stock?? 




