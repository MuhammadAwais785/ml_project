import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FEATURES } from './feature-schema';
import { PredictionService, PredictionResponse } from './prediction.service';
@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./app.html',styleUrl:'./app.css'})
export class App {
 readonly fields=FEATURES;
 readonly sections=[...new Set(FEATURES.map(f=>f.section))];
 readonly deployedStatic = !['localhost','127.0.0.1'].includes(window.location.hostname);
 values:Record<string,string|number|null>={};loading=false;error='';result:PredictionResponse|null=null;
 private api=inject(PredictionService);
 constructor(){for(const field of this.fields)this.values[field.name]=null;}
 fieldsIn(section:string){return this.fields.filter(field=>field.section===section);}
 submit(){
   this.error='';this.result=null;
   if(this.deployedStatic){this.error='Static Pages demonstration: run Angular + Flask locally.';return;}
   const payload:Record<string,string|number>={};
   for(const f of this.fields){let value=this.values[f.name];
     if(value===null||value===''){this.error=`Please complete ${f.label}`;return;}
     if(f.kind==='number') {const number=Number(value);if(!Number.isFinite(number)){this.error=`Invalid number: ${f.label}`;return;}payload[f.name]=number;}
     else payload[f.name]=String(value);
   }
   this.loading=true;
   this.api.predict(payload).subscribe({next:response=>{this.result=response;this.loading=false;},error:err=>{this.error=`API error ${err.status||''}: ${err.error?.error||err.message||'Unable to connect'}`;this.loading=false;}});
 }
}
