
//Metodo responsavel por atualizar o objeto do array
export const updateObjectInArrayById = (array = [], object = {}) => {
    return array.map((item, index) => {
        if (item.id !== object.id) {
            return item
        }
  
        return {
            ...item,
            ...object
        }
    })
}

//Metodo responsavel filtrar um array e retornar todos menos o objeto passado
export const removeObjectInArrayById = (array = [], id = 0) => array.filter(item => item.id !== id)

