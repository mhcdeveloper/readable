//Metodo responsavel filtrar um array e retornar todos menos o objeto passado
export const removeObjectInArrayById = (array = [], id = 0) => array.filter(item => item.id !== id)