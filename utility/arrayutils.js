function arraySort(array,order){
    //input->array to be sorted, and sort order: ascending, descending
    //output->sorted array
    sorted = array.sort()
    if (order=="ascending"){
        return sorted
    }
    reverse = sorted.reverse()
    return reverse
}

function arraySortByKey(array,order,key){
    //input->array to be sorted, and sort order: ascending, descending, and key in array item dict
    //output->sorted array or null
    if (array.length>0 && key in array[0]){
    if (order=="ascending"){
        array.sort( (a,b) => a[key] - b[key] );
        return array
    }else{
        array.sort( (a,b) => b[key] - a[key] );
        return array
    }
    }
    return null
}

function arrayFilterByKey(array, key, value){
    //input-> array with dictionary as item , key and its value
    //output->dictarray with items where key contains the value or null
    if (array.length>0 && key in array[0]){
        const data = array.filter((v,i)=>{
            if(v[key]===value){
                return v
            }
        })
        return data
    }
    return null
}

function arrayItemAdd(array,item){
    //input->array, and item to be added in last
    //output->array with new item added
    array.push(item)
    return array
}

function arrayItemUpdate(array,item, index){
    //input->array, item to be updated , and index
    //output->array with new item updated to index position or original array
    if(array.length>index && index>=0){
        array[index]=item
        return array
    }
    return array
}

function arrayIndexDelete(array,index){
    //input->array,and index to be deleted
    //output->updated array with removed index or original array
    if(array.length>index && index>=0){
        array.splice(index, 1);
        return array
    }
    return array
}

export {arraySort,arraySortByKey,arrayFilterByKey,arrayItemAdd,arrayItemUpdate,arrayIndexDelete};