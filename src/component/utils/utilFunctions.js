export function convertBase64 (file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
export function base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Blob([bytes]);
  }

  export function createImageSourceFromBase64(base64) {
    return base64 ? `data:image/jpeg;base64,${base64}` : null;
  }
  

export const createFormData = (formKey, formData, attachmentKey, ...attachmentData)=>{
   let form = new FormData();
   form.append(formKey,  new Blob([JSON.stringify(formData)], { type: 'application/json' }));
   attachmentData.forEach(file => {
     form.append(attachmentKey, file);
    })
    const config = {
      maxBodyLength:Infinity,
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }
    console.log(form);
   return {
    form:form,
    config:config
   }
}
