let a = [{name: 'soniya', job: 'CEO'}, {name: 'sana', job: 'HR'}, {name: 'saba', job: 'pilot'}, {name: 'sushma', job: 'manager'}, {name: 'soumya', job: 'doctor'}]

let searchData = 'ceo'

let final_result = a.filter(function(ele){

    
    return ele.job.toLowerCase().includes(searchData.toLocaleLowerCase()) || ele.name.toLowerCase().includes(searchData.toLocaleLowerCase())
})

console.log('output: ', final_result)