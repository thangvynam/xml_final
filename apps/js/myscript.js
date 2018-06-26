
function getNameIsLogin(){
  return json
}
function nameProduct(name,Danh_sach){
    for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++) {
      var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
       Ten = Mat_hang.getAttribute("Ten")
      if(Ten===name){
         Ma_so = Mat_hang.getAttribute("Ma_So")
         Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia_Ban"))
         RAM = Mat_hang.getAttribute("RAM")
         PIN = Mat_hang.getAttribute("PIN")
         Bo_Nho_Trong = Mat_hang.getAttribute("Bo_Nho_Trong")
         Chi_tiet = Mat_hang.getAttribute("Chi_tiet")
         NCC = Mat_hang.getAttribute("NCC")
         a =JSON.stringify({NCC:NCC,Chi_tiet:Chi_tiet,Ten:Ten, Ma_so: Ma_so ,Don_gia_Ban :Don_gia_Ban,RAM:RAM,PIN:PIN, Bo_Nho_Trong:Bo_Nho_Trong})
        return a
      }
      
}
}

function Doc_Danh_sach_Mat_hang() { 
    var Dia_chi_Dich_vu="http://localhost:3001/DanhSachDienThoai" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", Dia_chi_Dich_vu, false);
    xhttp.send();
    console.log(xhttp.responseText)
    Du_lieu=new DOMParser().parseFromString(xhttp.responseText, "text/xml").documentElement

    return Du_lieu
}

function Du_lieu_dien_thoai(Danh_sach){
  var tenDT = new Array();
  for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++){
    var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
    var Ten = Mat_hang.getAttribute("Ten")
    tenDT.push(Ten)
  }
  return tenDT
}
function checkUser(username,password){
 
      var Dia_chi_Dich_vu="http://localhost:3001/login" // gửi qua DAL xử lý 
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", Dia_chi_Dich_vu, false);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(username+"&"+password);
      json = JSON.parse(xhttp.responseText);
      json_global=json
      return json
}
function Tao_Chuoi_HTML_Danh_sach_Mat_hang_Noi_bat(Danh_sach) {
  
    var Dia_chi_Media = "./img"
    var DS_DT= document.createElement("div")
    DS_DT.className ="row"
    for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++) {
    
      
      var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
      var NOI_BAT =Mat_hang.getAttribute("NOI_BAT")
      if(NOI_BAT!=null){
          var Ten = Mat_hang.getAttribute("Ten")
          var Ma_so = Mat_hang.getAttribute("Ma_So")
          var Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia_Ban"))  
          
          var Th_Hinh = document.createElement("img")
          Th_Hinh.className ="product-img"
          Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.jpg`
          Th_Hinh.style.cssText = `width:200px;height:200px;text-align:center;margin-left: 2em;margin-top:2em`
      
          var Th_Thong_tin = document.createElement("div")
          
          Th_Thong_tin.style.cssText = `text-align:center`
          Th_Thong_tin.className="product-body"
          var TEN_SP=document.createElement("strong")
          TEN_SP.innerHTML=`${Ten}<br/>`
          TEN_SP.className="product-name"
          var GIA=document.createElement("p")
          GIA.innerHTML=`${Don_gia_Ban.toLocaleString("vi")}`
          var STAR = document.createElement("div")
          STAR.className="product-rating"
          for(let i =0 ;i<4;i++){
            var I = document.createElement("i")
            I.className = "fa fa-star" 
            STAR.appendChild(I)
          }


          Th_Thong_tin.appendChild(TEN_SP)
          Th_Thong_tin.appendChild(GIA)
          Th_Thong_tin.appendChild(STAR)
          
          var A= document.createElement("a")
          A.href= Ten 
          A.appendChild(Th_Thong_tin)
          var CART = document.createElement("div")
          CART.className="add-to-cart"
          var I_CART = document.createElement("i")
          I_CART.className = "fa fa-shopping-cart" 
          
          var BUTTON_CART = document.createElement("button")
          BUTTON_CART.className= "add-to-cart-btn"
          BUTTON_CART.innerHTML ="Add to cart"
          BUTTON_CART.appendChild(I_CART)

          CART.appendChild(BUTTON_CART)
        

          var Th_Mat_hang = document.createElement("div")
          Th_Mat_hang.className = `col-md-3 product `
          Th_Mat_hang.style.cssText = `padding: 15 15 15px 15px;border: none;border-radius: 100;}`
          
          Th_Mat_hang.appendChild(Th_Hinh)
          Th_Mat_hang.appendChild(A)
          Th_Mat_hang.appendChild(CART)
      

          DS_DT.appendChild(Th_Mat_hang)
      }
    }
    var Chuoi_HTML=DS_DT.outerHTML
    return Chuoi_HTML
  }
  function Tra_Ma_So(Danh_sach,tenDT,obj){
    var Dia_chi_Media = "./img"
    for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++) {
      var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
      var Ten = Mat_hang.getAttribute("Ten")
      if(tenDT===Ten){
          obj.value=Mat_hang.getAttribute("Don_gia_Ban")
          var IMAGE = document.createElement("img")
          var Ma_So = Mat_hang.getAttribute("Ma_So")
          IMAGE.src =`${Dia_chi_Media}/${Ma_So}.jpg`;
          IMAGE.width = "460"
          IMAGE.height = "345"
          return IMAGE.outerHTML
      }
  }
}
  function Tao_Chuoi_HTML_Danh_sach_Mat_hang_Cu_the(Danh_sach,tenNCC) {
  
    var Dia_chi_Media = "./img"
    var DS_DT= document.createElement("div")
    DS_DT.className ="row"
    let count =0 ;
    for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++) {

      var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
      var NCC  = Mat_hang.getAttribute("NCC")
      if(count === 4)
        break
      if(NCC===tenNCC){
        count++
        var Ten = Mat_hang.getAttribute("Ten")
        var Ma_so = Mat_hang.getAttribute("Ma_So")
        var Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia_Ban"))  
        
        var Th_Hinh = document.createElement("img")
        Th_Hinh.className ="product-img"
        Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.jpg`
        Th_Hinh.style.cssText = `width:200px;height:200px;text-align:center;margin-left: 2em;margin-top:2em`
    
        var Th_Thong_tin = document.createElement("div")
        
        Th_Thong_tin.style.cssText = `text-align:center`
        Th_Thong_tin.className="product-body"
        var TEN_SP=document.createElement("strong")
        TEN_SP.innerHTML=`${Ten}<br/>`
        TEN_SP.className="product-name"
        var GIA=document.createElement("p")
        GIA.innerHTML=`${Don_gia_Ban.toLocaleString("vi")}`
        var STAR = document.createElement("div")
        STAR.className="product-rating"
        for(let i =0 ;i<4;i++){
          var I = document.createElement("i")
          I.className = "fa fa-star" 
          STAR.appendChild(I)
        }


        Th_Thong_tin.appendChild(TEN_SP)
        Th_Thong_tin.appendChild(GIA)
        Th_Thong_tin.appendChild(STAR)
        
        var A= document.createElement("a")
        A.href= Ten 
        A.appendChild(Th_Thong_tin)
        var CART = document.createElement("div")
        CART.className="add-to-cart"
        var I_CART = document.createElement("i")
        I_CART.className = "fa fa-shopping-cart" 
        
        var BUTTON_CART = document.createElement("button")
        BUTTON_CART.className= "add-to-cart-btn"
        BUTTON_CART.innerHTML ="Add to cart"
        BUTTON_CART.appendChild(I_CART)

        CART.appendChild(BUTTON_CART)
      

        var Th_Mat_hang = document.createElement("div")
        Th_Mat_hang.className = `col-md-3 product `
        Th_Mat_hang.style.cssText = `padding: 15 15 15px 15px;border: none;border-radius: 100;}`
        
        Th_Mat_hang.appendChild(Th_Hinh)
        Th_Mat_hang.appendChild(A)
        Th_Mat_hang.appendChild(CART)
    

        DS_DT.appendChild(Th_Mat_hang)
      }
    }
    var Chuoi_HTML=DS_DT.outerHTML
    return Chuoi_HTML
  }

  function Tao_Chuoi_HTML_Danh_sach_Mat_hang_lien_quan(Danh_sach,tenNCC,tenSanPham) {
  
    var Dia_chi_Media = "./img"
    var DS_DT= document.createElement("div")
    DS_DT.className ="row"
    let count =0 ;
    for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++) {

      var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
      var NCC  = Mat_hang.getAttribute("NCC")
      
      if(NCC===tenNCC){
        count++
        var Ten = Mat_hang.getAttribute("Ten")
        if(Ten === tenSanPham)
            continue
        var Ma_so = Mat_hang.getAttribute("Ma_So")
        var Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia_Ban"))  
        
        var Th_Hinh = document.createElement("img")
        Th_Hinh.className ="product-img"
        Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.jpg`
        Th_Hinh.style.cssText = `width:200px;height:200px;text-align:center;margin-left: 2em;margin-top:2em`
    
        var Th_Thong_tin = document.createElement("div")
        
        Th_Thong_tin.style.cssText = `text-align:center`
        Th_Thong_tin.className="product-body"
        var TEN_SP=document.createElement("strong")
        TEN_SP.innerHTML=`${Ten}<br/>`
        TEN_SP.className="product-name"
        var GIA=document.createElement("p")
        GIA.innerHTML=`${Don_gia_Ban.toLocaleString("vi")}`
        var STAR = document.createElement("div")
        STAR.className="product-rating"
        for(let i =0 ;i<4;i++){
          var I = document.createElement("i")
          I.className = "fa fa-star" 
          STAR.appendChild(I)
        }


        Th_Thong_tin.appendChild(TEN_SP)
        Th_Thong_tin.appendChild(GIA)
        Th_Thong_tin.appendChild(STAR)
        
        var A= document.createElement("a")
        A.href= Ten 
        A.appendChild(Th_Thong_tin)
        var CART = document.createElement("div")
        CART.className="add-to-cart"
        var I_CART = document.createElement("i")
        I_CART.className = "fa fa-shopping-cart" 
        
        var BUTTON_CART = document.createElement("button")
        BUTTON_CART.className= "add-to-cart-btn"
        BUTTON_CART.innerHTML ="Add to cart"
        BUTTON_CART.appendChild(I_CART)

        CART.appendChild(BUTTON_CART)
      

        var Th_Mat_hang = document.createElement("div")
        Th_Mat_hang.className = `col-md-3 product `
        Th_Mat_hang.style.cssText = `padding: 15 15 15px 15px;border: none;border-radius: 100;}`
        
        Th_Mat_hang.appendChild(Th_Hinh)
        Th_Mat_hang.appendChild(A)
        Th_Mat_hang.appendChild(CART)
    

        DS_DT.appendChild(Th_Mat_hang)
      }
    }
    var Chuoi_HTML=DS_DT.outerHTML
    return Chuoi_HTML
  }