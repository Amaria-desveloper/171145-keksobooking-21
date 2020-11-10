(()=>{"use strict";window.constants={QUANTITY_PINS:5,TYPES:{flat:"Квартира",house:"Дом",palace:"Дворец",bungalow:"Бунгало"},CAPACITY:["для 1 гостя","для 2 гостей","для 3 гостей","не для гостей"],TIME_IN:["12:00","13:00","14:00"],FEATURES:["wifi","dishwasher","parking","washer","elevator","conditioner"],DEPENCE_ROOM_GUESTS:{1:[1],2:[1,2],3:[1,2,3],100:[0]},TYPE_MIN_PRICE:{palace:"10000",flat:"1000",house:"5000",bungalow:"0"}},window.variables={map:{map:document.querySelector(".map"),mapPins:document.querySelector(".map__pins"),mapPin:document.querySelector(".map__pin"),mapPinMain:document.querySelector(".map__pin--main"),mapFilter:document.querySelector(".map__filters")},form:{adForm:document.querySelector(".ad-form"),adFormFieldset:document.querySelectorAll(".ad-form fieldset"),adFormAddress:document.querySelector("#address"),adFormAvatar:document.querySelector("#avatar"),adFormType:document.querySelector("#type"),adFormPrice:document.querySelector("#price"),adFormCapacity:document.querySelector("#capacity"),adFormImages:document.querySelector("#images"),adFormRoomNumber:document.querySelector("#room_number")}},(()=>{const e={getWidth:e=>e.offsetWidth,getHeight:e=>e.offsetHeight},t=e=>parseInt(e.style.top,10),r=e=>parseInt(e.style.left,10);window.util={sizeOfElement:e,getOffset:t=>({x:parseInt(e.getWidth(t)/2,10),y:parseInt(e.getHeight(t)/2,10)}),findElement:(e,t)=>e[t]||"",getCoordinateOfPinMain:()=>{let o=document.querySelector(".map__pin--main");const n=window.getComputedStyle(o,"::after"),a=parseInt(n.getPropertyValue("border-top-width"),10);return[Math.floor(r(o)+e.getWidth(o)/2)+", "+Math.floor(t(o)+e.getHeight(o)+a/2)]},getCoordinateCenterOfPinMain:o=>[Math.floor(r(o)+e.getWidth(o)/2)+", "+Math.floor(t(o)+e.getHeight(o)/2)],closeElement:e=>e.remove(),makeDisabled:{set:e=>{for(let t=0;t<e.length;t++)e[t].setAttribute("disabled",!0)},remove:e=>{for(let t=0;t<e.length;t++)e[t].removeAttribute("disabled",!0)}},modalLayout:e=>{const t=document.createElement("div");t.id="modal",t.style="z-index: 100; display: flex; justify-content: center; min-height: 50px; margin: auto; padding: 15px; background-color: white; border: 2px solid SkyBlue; border-radius: 10px",t.style.position="fixed",t.style.left=0,t.style.right=0,t.style.fontSize="26px";const r=document.createElement("p");r.style="display: inherit",r.textContent=e;const o=document.createElement("button");return o.id="modalButton",o.style="display: block; width: 40px; height: 20px; border-radius: 4px; border-color: SkyBlue; background-color: seashell; outline-color: SkyBlue",o.style.position="absolute",o.style.bottom="2px",o.style.fontSize="12px",o.textContent="OK",t.appendChild(r),t.appendChild(o),t},debounce:e=>{let t=null;return(...r)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...r)}),500)}}}})(),(()=>{const e=window.variables.map.mapFilter,t=e.querySelector('select[name="housing-type"]'),r=e.querySelector('.map__filters select[name="housing-price"]'),o=e.querySelector('.map__filters select[name="housing-rooms"]'),n=e.querySelector('.map__filters select[name="housing-guests"]');window.filter={makeFilter:a=>{const i=()=>{let t=e.querySelectorAll('.map__filters .map__features input[name="features"]:checked'),r=[];return Array.from(t).map((e=>{r.push(e.value)})),r};let s=(()=>{let e={type:t.value,price:{min:0,max:1/0},rooms:"",guests:"",features:i()};return"any"===t.value&&(e.type=""),"any"!==r.value&&("low"===r.value?e.price.max=1e4:"middle"===r.value?(e.price.min=1e4,e.price.max=5e4):e.price.min=5e4),"any"!==o.value&&(e.rooms=Number(o.value,0)),"any"!==n.value&&(e.guests=Number(n.value,0)),e})();return a.filter((e=>{let t=e.offer.type===s.type||""===s.type,r=e.offer.price>=s.price.min&&e.offer.price<s.price.max,o=e.offer.rooms===s.rooms||""===s.rooms,n=e.offer.guests===s.guests||""===s.guests,a=s.features.every((t=>e.offer.features.includes(t)));return t&&r&&o&&n&&a}))}}})(),(()=>{const e=window.util.findElement,t=window.util.closeElement,r=window.constants.TYPES,o=window.constants.FEATURES,n=document.querySelector("#card").content.querySelector(".map__card");window.card={setupCard:(a,i)=>{let s=n.cloneNode(!0);if(s.querySelector(".popup__avatar").src=a.author.avatar,s.querySelector(".popup__title").textContent=a.offer.title,s.querySelector(".popup__text--address").textContent=a.offer.address,s.querySelector(".popup__text--price").textContent=a.offer.price+" ₽/ночь",s.querySelector(".popup__type").textContent=e(r,a.offer.type),s.querySelector(".popup__text--capacity").textContent=`Комнат: ${a.offer.rooms}, кол-во спальных мест: ${a.offer.guests}`,s.querySelector(".popup__text--time").textContent=`Заезд после ${a.offer.checkin}, выезд до ${a.offer.checkout}`,o.filter((e=>{a.offer.features.includes(e)||s.querySelector(".popup__feature--"+e).remove()})),s.querySelector(".popup__description").textContent=a.offer.description,0===a.offer.photos.length)s.querySelector(".popup__photo").setAttribute("style","visibility: hidden;");else if(s.querySelector(".popup__photo").src=a.offer.photos[0],a.offer.photos.length>1)for(let e=1;e<a.offer.photos.length;e++){let t=document.createElement("img");t.classList.add("popup__photo"),t.src=a.offer.photos[e],t.width="45",t.height="40",t.alt="Фотография жилья",s.querySelector(".popup__photos").appendChild(t)}const d=e=>{"Escape"===e.key&&(e.preventDefault(),t(s)),document.removeEventListener("keydown",d)};return s.querySelector(".popup__close").addEventListener("click",(()=>{t(s),i.classList.remove("map__pin--active")})),document.addEventListener("keydown",d),s},removeCard:()=>{const e=document.querySelector(".map__card");e&&t(e)}}})(),(()=>{const e=window.util.closeElement,t=window.util.debounce,r=window.filter.makeFilter,o=window.card.setupCard,n=window.card.removeCard,a=window.constants.QUANTITY_PINS,i=window.variables.map.mapPins,s=window.variables.map.mapFilter,d=document.querySelector("#pin").content.querySelector(".map__pin"),l=(e,t)=>{let r=d.cloneNode(!0);return r.querySelector("img").src=e[t].author.avatar,r.querySelector("img").alt=e[t].offer.title,r.style.left=e[t].location.x+"px",r.style.top=e[t].location.y+"px",r.addEventListener("click",(()=>{c(e[t],r)})),r},c=(t,r)=>{let n=document.querySelector(".map__card");null!==n&&e(n),i.querySelector(".map__pin--active")&&i.querySelector(".map__pin--active").classList.remove("map__pin--active"),r.classList.add("map__pin--active"),i.append(o(t,r))},u=(e,t)=>{let r=document.createDocumentFragment();for(let o=0;o<t;o++)r.appendChild(l(e,o));return r},m=e=>{let t=[];for(let r=0;r<e.length;r++)void 0!==e[r].offer&&t.push(e[r]);return t},p=()=>{let t=i.querySelectorAll(".map__pin:not(.map__pin--main)");for(let r of t)e(r)};window.pin={renderPins:u,removeCurrentPins:p,generateAvailablePins:m,addPinOnMap:e=>{let o=m(e),d=o.reverse();i.append(u(d,a)),s.addEventListener("change",t((()=>{p(),n();let e=r(o),t=e.length;t<a?i.append(u(e,t)):i.append(u(e,a))})))}}})(),(()=>{const e=window.util.closeElement,t=window.pin.addPinOnMap,r=window.util.modalLayout,o=document.querySelector("#success").content.querySelector(".success"),n=document.querySelector("#error").content.querySelector(".error"),a=()=>{let t=document.querySelector(".success"),r=document.querySelector(".error");r&&e(r),t&&e(t),document.removeEventListener("click",a),document.removeEventListener("keydown",i)},i=e=>{"Escape"===e.key&&(e.preventDefault(),a())},s=(e,t)=>{const r=e.cloneNode(!0);e===n&&(r.querySelector(".error__message").textContent=t),document.body.insertAdjacentElement("afterbegin",r),r.tabIndex=0,r.focus()};window.notices={errorDataHandler:t=>{document.body.insertAdjacentElement("afterbegin",r(t));const o=document.querySelector("#modal"),n=document.querySelector("#modalButton");n.focus();const a=t=>{"Escape"===t.key&&(t.preventDefault(),e(o)),document.removeEventListener("keydown",a)};n.addEventListener("click",(t=>{t.preventDefault(),e(o)})),document.addEventListener("keydown",a)},sendIsSuccess:()=>{s(o),window.main.restartPage(),document.addEventListener("click",a),document.addEventListener("keydown",i)},sendIsError:e=>{s(n,e),document.querySelector(".error").querySelector(".error__button").addEventListener("click",a),document.addEventListener("keydown",i)},successDataHandler:e=>{t(e)}}})(),(()=>{const e=(e,t,r,o,n)=>{const a=new XMLHttpRequest;return a.responseType="json",a.timeout=1e4,a.open(r,o),a.send(n),a.addEventListener("load",(()=>{let r="";switch(a.status){case 200:e(a.response);break;case 400:r="Неверный запрос";break;case 404:r="Ничего не найдено. (По этому URL пусто)";break;case 500:r="Сервис сломался, попробуйте позже";break;default:t(`Статус ответа: ${a.status} ${a.statusText}`)}r&&t(r)})),a.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),a.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за 10000 мс")})),a};window.backend={load:(t,r)=>{e(t,r,"GET","https://21.javascript.pages.academy/keksobooking/data")},save:(t,r,o)=>{e(t,r,"POST","https://21.javascript.pages.academy/keksobooking",o)}}})(),(()=>{const e=window.constants.TYPE_MIN_PRICE,t=window.util.closeElement,r=window.variables.form.adForm,o=window.variables.form.adFormAddress,n=window.variables.form.adFormAvatar,a=window.variables.form.adFormType,i=window.variables.form.adFormPrice,s=window.variables.form.adFormCapacity,d=window.variables.form.adFormImages,l=window.variables.form.adFormRoomNumber,c=document.querySelector("#timein"),u=document.querySelector("#timeout"),m=document.querySelector(".ad-form-header__preview img"),p=document.querySelector(".ad-form__photo"),w=document.querySelector(".ad-form__reset");var f,v;v=u,(f=c).addEventListener("change",(()=>{v.value=f.value})),v.addEventListener("change",(()=>{f.value=v.value}));const y=e=>["image/gif","image/jpg","image/jpeg","image/png"].includes(e.type),g=e=>{e.reset(),(()=>{const e=p.querySelector("img");e&&t(e),m.src="img/muffin-grey.svg"})(),l.selectedIndex=0,s.selectedIndex=0};w.addEventListener("click",(e=>{e.preventDefault(),g(r),window.main.restartPage()})),window.form={setAddressValue:(e,t)=>{e.value=t},installDefaultForm:()=>{for(let e=1;e<s.length;e++)s[e].setAttribute("style","display: none");o.setAttribute("style","color: brown"),o.setAttribute("readonly","true"),i.placeholder="1000",i.setAttribute("min",e[a.value]),i.setAttribute("max","1000000"),n.setAttribute("accept","image/*"),d.setAttribute("accept","image/*")},showAvatarPreview:e=>{let t=e.files[0];y(t)&&(m.src=URL.createObjectURL(t))},showImagesPreview:e=>{let t=e.files[0],r=y(t),o=p.querySelector("img");r&&(o?o.src=URL.createObjectURL(t):p.appendChild((e=>{let t=document.createElement("img");return t.setAttribute("width","100%"),t.setAttribute("height","100%"),t.src=URL.createObjectURL(e),t})(t)))},formReset:g}})(),(()=>{const e=window.constants.TYPE_MIN_PRICE,t=window.backend.save,r=window.notices.sendIsSuccess,o=window.notices.sendIsError,n=window.form.showAvatarPreview,a=window.form.showImagesPreview,i=window.constants.DEPENDS_ROOM_GUESTS,s=window.variables.form.adForm,d=window.variables.form.adFormAvatar,l=window.variables.form.adFormType,c=window.variables.form.adFormPrice,u=window.variables.form.adFormCapacity,m=window.variables.form.adFormImages,p=window.variables.form.adFormRoomNumber,w=document.querySelector("#title"),f=(e,t,r,o,n)=>{e?(n.setCustomValidity(t),n.reportValidity()):r?(n.setCustomValidity(o),n.reportValidity()):n.setCustomValidity("")},v=e=>{S(e.target.value,e.target,u)},y=e=>{f(e.target.value.length<30,"Заголовок объявления должен быть больше 30 символов",e.target.value.length>100,"Заголовок объявления должен быть меньше 100 символов",w)},g=e=>{n(e.target)},_=e=>{a(e.target)},b=e=>{h(e.target.value,c)},h=(t,r)=>{r.setAttribute("min",e[t]),r.placeholder=e[t],c.addEventListener("blur",(r=>{r.preventDefault(),f(c.value<e[t]||"","Цена не менее "+e[t],l.value>1e6,"Цена не более 1 000 000",c)}))},S=(e,t,r)=>{var o,n,a;o=i[e].includes(Number(r.value),0),n="выберите допустимое количество гостей",a=r,o?a.setCustomValidity(""):(a.setCustomValidity(n),a.reportValidity()),t.querySelector(`option[value="${e}"`).setAttribute("selected","true");for(let e=0;e<r.length;e++)r[e].setAttribute("style","display: none");i[e].forEach((e=>{r.querySelector(`option[value="${e}"]`).setAttribute("style","display: auto")})),u.addEventListener("change",(o=>{o.target.querySelector(`option[value="${o.target.value}"]`).setAttribute("selected","true"),S(e,t,r)}))};s.addEventListener("submit",(e=>{t(r,o,new FormData(s)),e.preventDefault()})),window.validateForm={validate:()=>{p.addEventListener("change",v),w.addEventListener("input",y),l.addEventListener("change",b),d.addEventListener("change",g),m.addEventListener("change",_)}}})(),(()=>{const e=window.variables.map.mapPinMain,t=window.variables.map.map,r=window.util.sizeOfElement.getWidth,o=window.util.getOffset,n=window.form.setAddressValue,a=o(e).x,i={TOP:130,BOTTOM:630,left:0-a,right:r(t)-a},s=(t,r,o,n)=>{e.style[t]=r<o?o+"px":r>n?n+"px":r+"px"};window.dragPinMain=t=>{t.preventDefault();let r={x:t.clientX,y:t.clientY};const o=t=>{t.preventDefault();const o=r.x-t.clientX,n=r.y-t.clientY;r={x:t.clientX,y:t.clientY};const a={x:e.offsetLeft-o,y:e.offsetTop-n};s("left",a.x,i.left,i.right),s("top",a.y,i.TOP,i.BOTTOM)},a=e=>{e.preventDefault();const t=window.variables.form.adFormAddress,r=window.util.getCoordinateOfPinMain();n(t,r),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",a)}})(),(()=>{const e=window.util.getCoordinateCenterOfPinMain,t=window.util.makeDisabled,r=window.backend.load,o=window.notices.successDataHandler,n=window.notices.errorDataHandler,a=window.card.removeCard,i=window.dragPinMain,s=window.form.formReset,d=window.form.installDefaultForm,l=window.form.setAddressValue,c=window.validateForm.validate,u=window.variables.map.map,m=window.variables.map.mapPinMain,p=window.variables.form.adForm,w=window.variables.form.adFormFieldset,f=window.variables.form.adFormAddress,v=document.querySelectorAll(".map__filters fieldset"),y=document.querySelectorAll(".map__filters select"),g={left:m.style.left,top:m.style.top};window.map={setInactive:()=>{u.classList.add("map--faded"),p.classList.add("ad-form--disabled"),s(p),t.set(w),t.set(v),t.set(y),a(),m.style.left=g.left,m.style.top=g.top,l(f,e(m))},makeWork:()=>{const e=a=>{a.preventDefault(),d(),c(),u.classList.remove("map--faded"),p.classList.remove("ad-form--disabled"),t.remove(w),t.remove(v),t.remove(y),r(o,n),m.addEventListener("mousedown",i),m.removeEventListener("click",e)};m.addEventListener("click",e)}}})(),(()=>{const e=window.pin.removeCurrentPins,t=window.map.setInactive,r=window.map.makeWork,o=()=>{t(),r()};o(),window.main={restartPage:()=>{e(),o()}}})()})();