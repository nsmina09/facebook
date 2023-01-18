import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(alluser=[],searchKey:String,propertyname:any): any[] {
   const result:any=[]
   if(!alluser ||searchKey==''||propertyname==''){
    return alluser;
   }
   alluser.forEach((user:any)=>{
    if(user[propertyname].trim().toLowerCase().includes(searchKey.toLowerCase().trim())){
      result.push(user)
    }
   })
    return result;
  }

}
