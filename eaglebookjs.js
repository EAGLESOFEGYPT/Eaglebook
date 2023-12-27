let UsersC = JSON.parse(localStorage.getItem('UsersC')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
function register() {
    let username = document.getElementById('registerUsername').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;

    // التحقق من ملء جميع الحقول
    if (!username || !email || !password) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    if (UsersC.find(user => user.email === email)) {
        alert('البريد الإلكتروني مستخدم بالفعل');
        return;
    }

    UsersC.push({ username, email, password });
    localStorage.setItem('UsersC', JSON.stringify(UsersC));
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
}


function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}
function updateStatusIndicator() {
    var statusIndicator = document.getElementById('statusIndicator');
    if (isLoggedIn()) {
        statusIndicator.style.backgroundColor = 'green';
    } else {
        statusIndicator.style.backgroundColor = 'gray';
    }
}
setInterval(updateStatusIndicator, 1000);

function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // التحقق من ملء جميع الحقول
    if (!email || !password) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    let user = UsersC.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('logout').style.display = 'block';
        document.getElementById('navbar').style.display = 'block';
        document.getElementById('navbar1').style.display = 'block';
        document.getElementById('app').style.display = 'block';
        document.getElementById('login').style.display = 'none';
       document.getElementById('all-form').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        navigateTo('home');
        displayAllPosts();
        displayUserPosts();
        displayUsers();
        
      
        document.getElementById('username').textContent = user.username;
        if (user.coverPhoto) {
            document.getElementById('coverPhoto').src = user.coverPhoto;
        }
        if (user.profilePhoto) {
            document.getElementById('profilePhoto').src = user.profilePhoto;
        }
        // تحديث الحالة بعد تسجيل الدخول
        localStorage.setItem(user.email, true);
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
}



function logout() {
    // تحديث القائمة UsersC لتشمل بيانات المستخدم الحالي
    let index = UsersC.findIndex(user => user.email === currentUser.email);
    if (index !== -1) {
        UsersC[index] = currentUser;
        localStorage.setItem('UsersC', JSON.stringify(UsersC));
    }
    // تحديث الحالة بعد تسجيل الخروج
    localStorage.removeItem(currentUser.email);
    // الكود الأصلي الخاص بك
    document.getElementById('logout').style.display = 'none';
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('navbar1').style.display = 'none';
    document.getElementById('app').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('all-form').style.display = 'block';
    
    navigateTo('home');
    displayAllPosts();
    displayUserPosts();
    displayUsers();
    
    
    document.getElementById('username').textContent = currentUser.username;
    if (currentUser.coverPhoto) {
        document.getElementById('coverPhoto').src = currentUser.coverPhoto;
    }
    if (currentUser.profilePhoto) {
        document.getElementById('profilePhoto').src = currentUser.profilePhoto;
    }
    // تسجيل الخروج
    localStorage.removeItem('currentUser');
    currentUser = null;
    setInterval(updateStatusIndicator, 1000);
}


if (currentUser) {
    document.getElementById('logout').style.display = 'block';
    document.getElementById('navbar').style.display = 'block';
    document.getElementById('navbar1').style.display = 'block';
    document.getElementById('app').style.display = 'block';
    document.getElementById('login').style.display = 'none';
   document.getElementById('all-form').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    navigateTo('home');
    displayUsers();
    
    document.getElementById('username').textContent = currentUser.username; // عرض اسم المستخدم
    if (currentUser.coverPhoto) {
        document.getElementById('coverPhoto').src = currentUser.coverPhoto;
    }
    if (currentUser.profilePhoto) {
        document.getElementById('profilePhoto').src = currentUser.profilePhoto;
        
        // تحديث العناصر التي تحتوي على الصورة الشخصية
        let profilePhotos = document.getElementsByClassName('profilePhoto');
        for(let i = 0; i < profilePhotos.length; i++) {
            profilePhotos[i].src = currentUser.profilePhoto;
        }
    }
}




function displayUsers() {
    let usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';
    UsersC.forEach(user => {
        // تحقق من المستخدم الحالي وعدم عرضه في قائمة المستخدمين
        if (currentUser && user.email !== currentUser.email) {
            let userElement = document.createElement('div');
            userElement.className = 'user';

            let profilePhoto = document.createElement('img');
            profilePhoto.src = user.profilePhoto || 'default-profile-photo.jpg';
            profilePhoto.className = 'profile-photo';

            // إضافة علامة الحالة
            let statusIndicator = document.createElement('div');
            statusIndicator.id = 'statusIndicator' + user.email; // يجب أن يكون هذا الرقم فريدًا لكل مستخدم
            statusIndicator.style.width = '0.7em';
            statusIndicator.style.height = '0.7em';
            statusIndicator.style.border = '3px solid ';
            statusIndicator.style.borderRadius = '50%';
            statusIndicator.style.position = 'relative';
            statusIndicator.style.top = '1.3em';
            statusIndicator.style.right = '2.4em';
            if (localStorage.getItem(user.email)) {
                statusIndicator.style.backgroundColor = 'green';
                statusIndicator.style.border = '1px solid';
            } else {
                statusIndicator.style.backgroundColor = 'gray';
                statusIndicator.style.border = '1px solid ';
            }
            userElement.appendChild(statusIndicator);

            let username = document.createElement('span');
            username.textContent = user.username;
            username.className = 'username';

            userElement.appendChild(profilePhoto);
            userElement.appendChild(username);

            // إضافة زر الحذف
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.addEventListener('click', function(e) {
                e.stopPropagation();  // منع الحدث من الانتشار إلى العناصر الأم
                UsersC = UsersC.filter(u => u.email !== user.email);
                localStorage.setItem('UsersC', JSON.stringify(UsersC));
                userElement.remove();
            });
            userElement.appendChild(deleteButton);

            // إضافة مُستمع للأحداث click
            userElement.addEventListener('click', function() {
                if (user.email === currentUser.email) {
                    // نقل المستخدم إلى صفحة الملف الشخصي الخاصة به
                    document.getElementById('profile').style.display = 'block';
                    document.getElementById('profileUsers').style.display = 'none';
                } else {
                    // فتح النافذة المنبثقة وعرض بيانات المستخدم
                    openUserPopup(user);
                }
            });

            usersContainer.appendChild(userElement);
        }
    });
}


 function openUserPopup(user) {
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.width = '400px';
    popup.style.height = '100vh';
    popup.style.padding = '20px';
    
    popup.style.border = '1px solid #ccc';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.zIndex = '1000';
    let coverPhoto = document.createElement('img');
    coverPhoto.src = user.coverPhoto || 'default-cover-photo.jpg';
    coverPhoto.className = 'cover-photo';
    coverPhoto.style.width = '100%';
    coverPhoto.style.height = '200px';
    coverPhoto.style.objectFit = 'cover';
    popup.appendChild(coverPhoto);
    let profileContainer = document.createElement('div');
    profileContainer.style.position = 'relative';
    profileContainer.style.width = '150px';
    profileContainer.style.height = '150px';
    profileContainer.style.top = '-80px';
    profileContainer.style.right = '110px';
    let profilePhoto = document.createElement('img');
    profilePhoto.src = user.profilePhoto || 'default-profile-photo.jpg';
    profilePhoto.className = 'profile-photo';
    profilePhoto.style.width = '100%';
    profilePhoto.style.height = '100%';
    profilePhoto.style.borderRadius = '50%';
    profilePhoto.style.objectFit = 'cover';
    profilePhoto.style.border = '3px solid'; 
    profileContainer.appendChild(profilePhoto);
    let statusIndicator = document.createElement('div');
    statusIndicator.id = 'statusIndicator' + user.email;
    statusIndicator.style.width = '1.5em';
    statusIndicator.style.height = '1.5em';
    statusIndicator.style.border = '3px solid ';
    statusIndicator.style.borderRadius = '50%';
    statusIndicator.style.position = 'absolute';
    statusIndicator.style.top = '125px';
    statusIndicator.style.right = '20px'; 
    if (localStorage.getItem(user.email)) {
        statusIndicator.style.backgroundColor = 'green';
        statusIndicator.style.border = '1px solid';
    } else {
        statusIndicator.style.backgroundColor = 'gray';
        statusIndicator.style.border = '1px solid ';
    } 
    profileContainer.appendChild(statusIndicator);
    popup.appendChild(profileContainer);
    let username = document.createElement('h2');
    username.textContent = user.username;
    username.style.position = 'absolute';
    username.style.right= '70px';
    username.style.top = '300px';
    
    popup.appendChild(username);
    let postsContainer = document.createElement('div');
postsContainer.id = 'userPosts';
postsContainer.style.marginTop = '250px';
let userPosts = JSON.parse(localStorage.getItem(user.username + 'AllPosts')) || [];

let postsHTML = userPosts.map((post, index) => {
  return `<p>${post.content}</p>`;
}).join('');
displayUserPosts();
postsContainer.innerHTML = postsHTML;
popup.appendChild(postsContainer);

    let closeButton = document.createElement('button');
    closeButton.textContent = 'إغلاق';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '20px';
    closeButton.style.top = '20px';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(popup);
    });
    popup.appendChild(closeButton);

    // إنشاء زر المراسلة
    let messageButton = document.createElement('button');
messageButton.textContent = 'مراسلة';
messageButton.style.position = 'absolute';
messageButton.style.right = '70px';
messageButton.style.top = '350px';
messageButton.addEventListener('click', function() {
    openChat(user);
});
popup.appendChild(messageButton);


    document.body.appendChild(popup);
}



function openChat(user) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let chatId = [currentUser.email, user.email].sort().join('');
    let messages = JSON.parse(localStorage.getItem(chatId + 'Messages')) || [];
    let chatPopup = document.createElement('div');
    chatPopup.id = 'chatPopup';
    chatPopup.innerHTML = `
        <div class="chat-popup" style="width: 360px; height:95vh; padding: 20px;  border: 1px solid; position: fixed; bottom: 0; right: 0; z-index: 1000; border-radius: 10px; overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #0000000d; border: 1px solid; border-radius: 10px;  position: sticky; top: 0; gap:10px">
                <img src="${user.profilePhoto || 'default-profile-photo.jpg'}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid;">
                <span>${user.username}</span>
                <button id="yourCloseButtonId" style="border: none; border-radius: 5px;" onclick='closeChat()'>إغلاق</button>
            </div>
            <div id="chatLog" style="height: calc(100% - 120px); overflow-y: scroll; padding: 10px;">
                ${messages.map(msg => `
                    <div style="background: ${msg.from === currentUser.username ? '#662bff' : '#50caf1e0'}; border-radius: 10px; margin-bottom: 10px; padding: 10px; position: relative; border: 1px solid;">
                        <img src="${msg.profilePhoto}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; position: absolute; top: 8%; right: 4%; border: 2px solid;">
                        <p style="margin-right: 70px; margin-top: -2px;"><strong>${msg.from}:</strong> ${msg.message}</p>
                        ${msg.from === currentUser.username ? '<button style="margin-right: 270px; background: #ff0000; color: #ffffff; border: none; border-radius: 5px; width: 50px; height: 20px; padding: 0;" onclick="deleteMessage(\'' + msg.id + '\', \'' + chatId + '\', this)">حذف</button>' : ''}
                    </div>
                `).join('')}
            </div>
            <div style="display: flex;">
                <button style="background: #25D366; border: none; border-radius: 9999px; padding: 10px 20px; width: 20%; height: 40px; margin-left: 10px; margin-top:-10px;" onclick="sendMessage('${chatId}')">إرسال</button>
                <input id="chatInput" placeholder=" أكتب رساله..." style="width: 70%; height: 20px; padding: 10px; padding-right: 20px; border-radius: 9999px; margin: 10px 0; margin-top: -10px; outline: none; border: 1px solid; font-size:16px">
            </div>
        </div>
    `;
    document.body.appendChild(chatPopup);
}


function closeChat() {
    // Remove the chat popup if it exists
    let chatPopup = document.getElementById('chatPopup');
    if (chatPopup) {
        document.body.removeChild(chatPopup);
    }
}



function sendMessage(chatId) {
    let chatInput = document.getElementById('chatInput');
    let message = chatInput.value;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let messages = JSON.parse(localStorage.getItem(chatId + 'Messages')) || [];
    let messageId = new Date().getTime().toString();  // إنشاء معرف فريد للرسالة
    messages.push({id: messageId, from: currentUser.username, message: message, profilePhoto: currentUser.profilePhoto});
    localStorage.setItem(chatId + 'Messages', JSON.stringify(messages));
    chatInput.value = '';
    let chatLog = document.getElementById('chatLog');
    chatLog.innerHTML = messages.map(msg => `
        <div style="background: ${msg.from === currentUser.username ? '#662bff' : '#50caf1e0'}; border-radius: 10px; margin-bottom: 10px; padding: 10px; position: relative; border: 1px solid;">
            <img src="${msg.profilePhoto}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; position: absolute; top: 8%; right: 4%; border: 2px solid;">
            <p style="margin-right: 70px; margin-top: -2px;"><strong>${msg.from}:</strong> ${msg.message}</p>
            ${msg.from === currentUser.username ? '<button style="margin-right: 270px; background: #ff0000; color: #ffffff; border: none; border-radius: 5px; width: 50px; height: 20px; padding: 0;" onclick="deleteMessage(\'' + msg.id + '\', \'' + chatId + '\', this)">حذف</button>' : ''}
        </div>
    `).join('');

    
}



function deleteMessage(messageId, chatId, element) {
    let messages = JSON.parse(localStorage.getItem(chatId + 'Messages'));
    messages = messages.filter(msg => msg.id !== messageId);
    localStorage.setItem(chatId + 'Messages', JSON.stringify(messages));
    updateChat(chatId);
}









 function updateChat(chatId) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let messages = JSON.parse(localStorage.getItem(chatId + 'Messages')) || [];
    let chatLog = document.getElementById('chatLog');
    chatLog.innerHTML = messages.map(msg => `
        <div style="background: ${msg.from === currentUser.username ? '#662bff' : '#50caf1e0'}; border-radius: 10px; margin-bottom: 10px; padding: 10px; position: relative; border: 1px solid;">
            <img src="${msg.profilePhoto}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; position: absolute; top: 8%; right: 4%; border: 2px solid;">
            <p style="margin-right: 70px; margin-top: -2px;"><strong>${msg.from}:</strong> ${msg.message}</p>
            ${msg.from === currentUser.username ? '<button style="margin-right: 270px; background: #ff0000; color: #ffffff; border: none; border-radius: 5px; width: 50px; height: 20px; padding: 0;" onclick="deleteMessage(\'' + msg.id + '\', \'' + chatId + '\', this)">حذف</button>' : ''}
        </div>
    `).join('');
    
}


// الحصول على العناصر من الـ DOM
// الحصول على العناصر من الـ DOM
let chatContainer = document.getElementById('chatContainer');
let inputField = document.getElementById('inputField');
let sendButton = document.getElementById('sendButton');
let deleteAllButton = document.getElementById('deleteAllButton');

// تحميل الرسائل المحفوظة
let messages = JSON.parse(localStorage.getItem('massagechat')) || [];
currentUser = JSON.parse(localStorage.getItem('currentUser'));

function createMessageElement(msg) {
    let message = document.createElement('div');
    message.className = 'message';
    message.style.justifyContent = 'space-between';
    message.style.alignItems = 'center';
    message.style.padding = '10px'; // تغيير القيمة حسب الحاجة

    // تحديد الفئة بناءً على المستخدم الذي أرسل الرسالة
    if (currentUser && currentUser.email === msg.userId) {
        message.classList.add('user-message');
    } else {
        message.classList.add('other-message');
    }

    let username = document.createElement('p');
    username.textContent = msg.username;
    username.style.margin = '0'; // تغيير القيمة حسب الحاجة
    message.appendChild(username);

    let text = document.createElement('p');
    text.textContent = msg.text;
    text.style.margin = '0'; // تغيير القيمة حسب الحاجة
    message.appendChild(text);

    let timestampAndDeleteButton = document.createElement('div');
    timestampAndDeleteButton.style.display = 'flex'; 
    timestampAndDeleteButton.style.justifyContent = 'space-between';
    timestampAndDeleteButton.style.alignItems = 'center';
    timestampAndDeleteButton.style.marginTop = '0'; // تغيير القيمة حسب الحاجة

    let timestamp = document.createElement('span');
    timestamp.textContent = ' ' + timeAgo(msg.time);
    timestampAndDeleteButton.appendChild(timestamp);

    if (currentUser && currentUser.email === msg.userId) {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            chatContainer.removeChild(message);
            messages = messages.filter(m => m.id !== msg.id);
            localStorage.setItem('massagechat', JSON.stringify(messages));
        });
        timestampAndDeleteButton.appendChild(deleteButton);
    }

    message.appendChild(timestampAndDeleteButton);

    return message;
}

function renderMessages() {
    chatContainer.innerHTML = '';

    messages.forEach(msg => {
        let message = createMessageElement(msg);
        chatContainer.prepend(message);
    });
}


renderMessages();

function renderUsers() {
    UsersC.forEach(user => {
        let userElement = document.createElement('div');
        userElement.className = 'user';

        userElement.addEventListener('click', function() {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            renderMessages(); // إعادة تقديم الرسائل بعد تحديث المستخدم الحالي
        });

        // تعيين المستخدم الحالي بناءً على currentUsername في localStorage
        if (localStorage.getItem('currentUsername') === user.username) {
            currentUser = user;
        }

        chatContainer.appendChild(userElement);
    });
}

renderUsers();

sendButton.addEventListener('click', function() {
    if (currentUser) {
        let msg = {
            id: Date.now(), // معرف فريد لكل رسالة
            userId: currentUser.email, // معرف المستخدم الذي كتب الرسالة
            username: currentUser.username,
            text: inputField.value,
            time: Date.now()
        };
        messages.push(msg);
        localStorage.setItem('massagechat', JSON.stringify(messages));

        let message = createMessageElement(msg);
        chatContainer.prepend(message);
        inputField.value = '';
    }
});

deleteAllButton.addEventListener('click', function() {
    localStorage.removeItem('massagechat');
    while (chatContainer.firstChild) {
        chatContainer.removeChild(chatContainer.firstChild);
    }
    messages = [];
});


function timeAgo(time) {
    let units = {
        'ثانية': 60,
        'دقيقة': 60,
        'ساعة': 24,
        'يوم': 7,
        'أسبوع': 4.35,
        'شهر': 12,
        'سنة': Infinity
    };

    let diff = Math.abs(Date.now() - time) / 1000;
    for (let unit in units) {
        if (diff < units[unit]) return 'منذ ' + Math.round(diff) +  ' '+ unit + '  ';
        diff /= units[unit];
    }
}




function editUsername() {
    let password = prompt('أدخل كلمة المرور لتأكيد العملية:');
    if (password === currentUser.password) {
        let newUsername = prompt('أدخل اسم المستخدم الجديد:');
        if (newUsername) {
            // تحديث اسم المستخدم في المتغير currentUser
            let oldUsername = currentUser.username;
            currentUser.username = newUsername;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            // تحديث اسم المستخدم في المصفوفة UsersC
            let userIndex = UsersC.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                UsersC[userIndex].username = newUsername;
                localStorage.setItem('UsersC', JSON.stringify(UsersC));
            }
            // تحديث الواجهة لعرض اسم المستخدم الجديد
            document.getElementById('username').textContent = newUsername;
            // تحديث اسم المستخدم في كل منشور
            let userPosts = JSON.parse(localStorage.getItem(oldUsername + 'AllPosts')) || [];
            userPosts.forEach(post => {
                post.userName = newUsername;
            });
            localStorage.setItem(newUsername + 'AllPosts', JSON.stringify(userPosts));
            localStorage.removeItem(oldUsername + 'AllPosts');
        }
    } else {
        alert('كلمة المرور غير صحيحة');
    }
    displayAllPosts();
    displayUserPosts();
    displayUsers();
    showUsers();
    openUserPopup(user);
    
}


function editPassword() {
    let password = prompt('أدخل كلمة المرور الحالية لتأكيد العملية:');
    if (password === currentUser.password) {
        let newPassword = prompt('أدخل كلمة المرور الجديدة:');
        if (newPassword) {
            // تحديث كلمة المرور في المتغير currentUser
            currentUser.password = newPassword;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            // تحديث كلمة المرور في المصفوفة UsersC
            let userIndex = UsersC.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                UsersC[userIndex].password = newPassword;
                localStorage.setItem('UsersC', JSON.stringify(UsersC));
            }
        }
    } else {
        alert('كلمة المرور غير صحيحة');
    }
}


function editEmail() {
    let password = prompt('أدخل كلمة المرور لتأكيد العملية:');
    if (password === currentUser.password) {
        let newEmail = prompt('أدخل البريد الإلكتروني الجديد:');
        if (newEmail && !UsersC.find(user => user.email === newEmail)) {
            let oldEmail = currentUser.email;
            currentUser.email = newEmail;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            UsersC = UsersC.filter(user => user.email !== oldEmail);
            UsersC.push(currentUser);
            localStorage.setItem('UsersC', JSON.stringify(UsersC));
        } else {
            alert('البريد الإلكتروني مستخدم بالفعل');
        }
    } else {
        alert('كلمة المرور غير صحيحة');
    }
}


function deleteAccount() {
    let password = prompt('أدخل كلمة المرور لتأكيد الحذف:');
    if (password === currentUser.password) {
        // حذف الحساب من المصفوفة UsersC
        UsersC = UsersC.filter(user => user.email !== currentUser.email);
        localStorage.setItem('UsersC', JSON.stringify(UsersC));

        // تحديث قائمة المستخدمين
        displayUsers();

        // تسجيل الخروج
        logout();
    } else {
        alert('كلمة المرور غير صحيحة');
    }
}





window.onload = function() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && currentUser.profilePhoto) {
        // تحديث العناصر التي تحتوي على الصورة الشخصية
        let profilePhotos = document.getElementsByClassName('profilePhoto');
        for(let i = 0; i < profilePhotos.length; i++) {
            profilePhotos[i].src = currentUser.profilePhoto;
        }
    }
}

// عرض الصورة في نافذة منبثقة
function showImageInPopup(imgSrc) {
    // إنشاء عنصر div للنافذة المنبثقة
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '0';
    popup.style.top = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000';

    // إنشاء عنصر img للصورة
    let img = document.createElement('img');
    img.src = imgSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';

    // إضافة الصورة إلى النافذة المنبثقة
    popup.appendChild(img);

    // إضافة النافذة المنبثقة إلى الجسم
    document.body.appendChild(popup);

    // إزالة النافذة المنبثقة عند النقر عليها
    popup.onclick = function() {
        document.body.removeChild(popup);
    }
}

function uploadCoverPhoto() {
    let file = document.getElementById('coverPhotoUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        currentUser.coverPhoto = reader.result;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('coverPhoto').src = reader.result;
        
        // تحديث العناصر التي تحتوي على صورة الغلاف
        let coverPhotos = document.getElementsByClassName('coverPhoto');
        for(let i = 0; i < coverPhotos.length; i++) {
            coverPhotos[i].src = reader.result;
        }
    }
    reader.readAsDataURL(file);
}

function uploadProfilePhoto() {
    let file = document.getElementById('profilePhotoUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        currentUser.profilePhoto = reader.result;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('profilePhoto').src = reader.result;
        
        // تحديث العناصر التي تحتوي على الصورة الشخصية
        let profilePhotos = document.getElementsByClassName('profilePhoto');
        for(let i = 0; i < profilePhotos.length; i++) {
            profilePhotos[i].src = reader.result;
        }

        // تحديث الصورة في كل منشور وتعليق
        userPosts.forEach((post) => {
            if(post.userName === currentUser.username) {
                post.userImage = reader.result;
            }
            post.comments.forEach((comment) => {
                if(comment.username === currentUser.username) {
                    comment.userImage = reader.result;
                }
            });
        });
        localStorage.setItem(currentUser.username + 'AllPosts', JSON.stringify(userPosts));

        // عرض المنشورات مرة أخرى لتحديث الصورة في المنشورات والتعليقات الموجودة
        displayAllPosts();
        displayUserPosts();
        
        // تحديث قائمة المستخدمين
        displayUsers();
        
        

    }
    reader.readAsDataURL(file);
}

// إضافة معالج الأحداث onclick للصورة الشخصية وصورة الغلاف
document.getElementById('profilePhoto').onclick = function() {
    showImageInPopup(this.src);
}
document.getElementById('coverPhoto').onclick = function() {
    showImageInPopup(this.src);
}






currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
let userPosts = JSON.parse(localStorage.getItem(currentUser.username + 'AllPosts')) || [];
 
function createPost(imageUrl) {
    let postBox = document.getElementById('postBox');
    let postText = postBox.value.trim(); // إزالة المسافات البيضاء من النص
    let postImage = imageUrl; // إضافة هذا السطر

    // تحقق من ما إذا كان المستخدم قد أدخل نصًا أو صورة أو كلاهما
    if (postText === '' && !postImage) {
        alert('يرجى إدخال نص أو صورة للمنشور');
        return;
    } else if (postText === '' && postImage) {
        postText = undefined; // إذا كان المستخدم قد أدخل صورة فقط
    } else if (postText && !postImage) {
        postImage = undefined; // إذا كان المستخدم قد أدخل نصًا فقط
    }

    let post = {
        text: postText,
        image: postImage,
        likes: 0,
        likedBy: [],
        comments: [],
        shares: 0,
        date: new Date().getTime(),
        user: currentUser,
        userName: currentUser.username,
        userImage: currentUser.profilePhoto
    };

    let userPosts = JSON.parse(localStorage.getItem(currentUser.username + 'AllPosts')) || [];
    userPosts.push(post);
    localStorage.setItem(currentUser.username + 'AllPosts', JSON.stringify(userPosts));
    postBox.value = '';
    closePopup();
    displayAllPosts();
    displayUserPosts();
    
}


document.getElementById('imageUpload').addEventListener('change', function(e) {
  let reader = new FileReader();
  reader.onload = function(event) {
    let imageUrl = event.target.result;
    // استخدم imageUrl عند إنشاء المنشور
    createPost(imageUrl);
  };
  reader.readAsDataURL(e.target.files[0]);
});






function openImageInModal(imageSrc) {
  // إنشاء النافذة المشروعة
  let modal = document.createElement('div');
  modal.style.display = 'block';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.zIndex = '1000';
  modal.style.padding = '50px';
  modal.style.boxSizing = 'border-box';
  modal.style.overflow = 'auto';

  // إنشاء الصورة
  let img = document.createElement('img');
  img.src = imageSrc;
  img.style.maxWidth = '100%';
  img.style.margin = '0 auto';
  img.style.display = 'block';

  // إضافة الصورة إلى النافذة المشروعة
  modal.appendChild(img);

  // إضافة النافذة المشروعة إلى الجسم
  document.body.appendChild(modal);

  // إغلاق النافذة المشروعة عند النقر خارج الصورة
  modal.addEventListener('click', function() {
    document.body.removeChild(modal);
  });
}

// Function to display all posts


function displayAllPosts() {
  let postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';
  for (let user of UsersC) {
    let userPosts = JSON.parse(localStorage.getItem(user.username + 'AllPosts')) || [];
    userPosts.forEach((post, index) => {
      let postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <div class="user-info">
          <img src="${post.userImage}" alt="User Image" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid ; object-fit: cover;">
          <h4 style="display: inline-block; margin-left: 10px; margin-right:10px; margin-top:-5px; font-size: 0.9em;">${post.userName}</h4>
          <div>
               <button style="left:5%; margin-top:-20px;  position: absolute; font-size: 1em; width: 25px; height: 25px; text-align: center; display:block; padding:2px;"  id="myBtn-s-post-${index}" onclick="openModal(${index})">...</button>
          <p style="font-size: 0.6em; position: absolute; right:21%;">${timeSince(post.date)}</p>
          </div>
        </div>
        <div id="myModal-s-post-${index}" class="modal">
          <div class="modal-content">
            <span class="close" onclick="closeModal(${index})">×</span>
            <div class="actions1">
              <button onclick="openEditPopup(${index})">✏️ تعديل</button>
              <button onclick="deletePost(${index})">🗑️ حذف</button>
            </div>
          </div>
        </div>
        ${!post.text && post.image ? `<div><img src="${post.image}" alt="Post Image" style="width: 100%; max-height:300px; object-fit: cover;" onclick="openImageInModal('${post.image}')"></div>` : ''}
  ${post.text && post.image ? `<div class="content" style="margin: 10px 0; padding: 10px; font-size: 0.9em;">${post.text}</div><div><img src="${post.image}" alt="Post Image" style="width: 100%; max-height:300px; object-fit: cover;" onclick="openImageInModal('${post.image}')"></div>` : ''}
        <div style="font-size: 0.5em;  display: flex; justify-content: space-between;">
          <p style="font-size: 1.5em;">(${post.likes})❤️ <a href="#" onclick="displayLikes('${post.userName}', ${index})">الاعجابات</a></p>
          
          <p style="font-size: 1.5em;">(${post.comments ? post.comments.length : 0})<a href="#" onclick="displayComments(${index}, '${post.userName}')"> 💬 التعليقات</a></p>
          <p style="font-size: 1.5em;">${post.shares}🔗 المشاركات</p>
        </div><hr>
        <div class="actions">
         <button id="like-button-${index}" onclick="likePost(${index}, '${post?.userName}')">${post.likedBy.includes(currentUser?.username) ? "❤️ أعجبني" : "🤍 أعجاب"}</button>
         
          <button onclick="commentPost(${index}, '${post.userName}')">💬 تعليق</button>
          <button onclick="sharePost(${index})">🔗 مشاركه</button>
        </div>
      `;
      postsDiv.appendChild(postDiv);
    });

    // After displaying all posts, update the comments count
    userPosts.forEach((post, index) => {
      updateCommentsCount(index, user.username, 'posts');
    });
  }
}






function displayUserPosts() {
  let postsDiv = document.getElementById('userPosts');
  postsDiv.innerHTML = '';
  let userPosts = JSON.parse(localStorage.getItem(currentUser.username + 'AllPosts')) || [];
  userPosts.forEach((post, index) => {
    let postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
       <div class="user-info">
          <img src="${post.userImage}" alt="User Image" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid ; object-fit: cover;">
          <h4 style="display: inline-block; margin-left: 10px; margin-right:10px; margin-top:-5px; font-size: 0.9em;">${post.userName}</h4>
          <div>
               <button style="left:5%; margin-top:-20px;  position: absolute; font-size: 1em; width: 25px; height: 25px; text-align: center; display:block; padding:2px;"  id="myBtn-s-post1-${index}" onclick="openModal1(${index})">...</button>
          <p style="font-size: 0.6em; position: absolute; right:21%;">${timeSince(post.date)}</p>
          </div>
        </div>
        <div id="myModal-s-post1-${index}" class="modal">
          <div class="modal-content">
            <span class="close" onclick="closeModal1(${index})">×</span>
            <div class="actions1">
              <button onclick="openEditPopup(${index})">✏️ تعديل</button>
              <button onclick="deletePost(${index})">🗑️ حذف</button>
            </div>
          </div>
        </div>
       ${!post.text && post.image ? `<div><img src="${post.image}" alt="Post Image" style="width: 100%; max-height:300px; object-fit: cover;" onclick="openImageInModal('${post.image}')"></div>` : ''}
  ${post.text && post.image ? `<div class="content" style="margin: 10px 0; padding: 10px; font-size: 0.9em;">${post.text}</div><div><img src="${post.image}" alt="Post Image" style="width: 100%; max-height:300px; object-fit: cover;" onclick="openImageInModal('${post.image}')"></div>` : ''}
        <div style="font-size: 0.5em;  display: flex; justify-content: space-between;">
          <p style="font-size: 1.5em;">(${post.likes})❤️ <a href="#" onclick="displayLikes('${post.userName}', ${index})">الاعجابات</a></p>
          
          <p style="font-size: 1.5em;">(${post.comments ? post.comments.length : 0})<a href="#" onclick="displayComments(${index}, '${post.userName}')"> 💬 التعليقات</a></p>
          <p style="font-size: 1.5em;">${post.shares}🔗 المشاركات</p>
        </div><hr>
        <div class="actions">
         <button id="like-button-${index}" onclick="likePost(${index}, '${post?.userName}')">${post.likedBy.includes(currentUser?.username) ? "❤️ أعجبني" : "🤍 أعجاب"}</button>
         
          <button onclick="commentPost(${index}, '${post.userName}')">💬 تعليق</button>
          <button onclick="sharePost(${index})">🔗 مشاركه</button>
        </div>
      `;
    postsDiv.appendChild(postDiv);
  });

  // After displaying user posts, update the comments count
  userPosts.forEach((post, index) => {
    updateCommentsCount(index, currentUser.username, 'userPosts');
  });
}






// JavaScript
let imageUrl = '';

document.getElementById('editPostButton').addEventListener('click', function() {
  let index = 0; // الفهرس الذي تريد تعديله
  let newText = document.getElementById('editPostBox').value;
  let newImage = imageUrl;
  editPost(index, newText, newImage);
});

document.getElementById('editImageUpload').addEventListener('change', function(e) {
  let reader = new FileReader();
  reader.onload = function(event) {
    imageUrl = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function openEditPopup(index) {
  let post = userPosts[index]; // الحصول على المنشور الذي تريد تعديله
  document.getElementById('editPostBox').value = post.text;
  document.getElementById('editPopup').style.display = 'block';
}


function editPost(index, newText, newImage) {
  let userPosts = JSON.parse(localStorage.getItem(currentUser.username + 'AllPosts'));
  if (userPosts[index] && userPosts[index].userName === currentUser.username) {
    if (newText) {
        userPosts[index].text = newText;
    }
    if (newImage) {
        userPosts[index].image = newImage;
    } else {
        // إذا لم يتم تحديد صورة جديدة، احتفظ بالصورة الأصلية
        userPosts[index].image = userPosts[index].image;
    }
    localStorage.setItem(currentUser.username + 'AllPosts', JSON.stringify(userPosts));
    displayAllPosts();
    displayUserPosts();
    document.getElementById('editPopup').style.display = 'none'; // إغلاق النافذة المنبثقة
    document.getElementById('editPostBox').value = ''; // إفراغ حقل النص
    document.getElementById('editImageUpload').value = ''; // إفراغ حقل الصورة
    location.reload(); // إعادة تحميل الصفحة
  } else {
    alert('لا يمكنك تعديل منشورات ليست لك');
  }
}


document.getElementById('closeEditPopupButton').addEventListener('click', function() {
  document.getElementById('editPopup').style.display = 'none';
});



// حذف المنشور
function deletePost(index) {
  let userPosts = JSON.parse(localStorage.getItem(currentUser.username + 'AllPosts'));
  if (userPosts[index] && userPosts[index].userName === currentUser.username) {
    userPosts.splice(index, 1);
    localStorage.setItem(currentUser.username + 'AllPosts', JSON.stringify(userPosts));
    displayAllPosts();
    displayUserPosts();
    
  } else {
    alert('لا يمكنك حذف منشورات ليست لك');
  }
}
function clearPosts() {
    localStorage.removeItem(currentUser.username + 'AllPosts');
}
// هذا الكود يضيف مستمع الحدث إلى الزر
document.getElementById('deleteAllPostsButton').addEventListener('click', function() {
    clearPosts();
});



function likePost(index, username) {
    let allUsersPosts = JSON.parse(localStorage.getItem(username + 'AllPosts')) || [];
    let post = allUsersPosts[index];
    if (!post.likedBy) {
        post.likedBy = [];
    }
    let likeButton = document.querySelector(`#like-button-${index}`);
    if (currentUser && !post.likedBy.includes(currentUser.username)) {
        post.likes += 1;
        post.likedBy.push(currentUser.username);
        likeButton.innerHTML = "❤️ أعجبني";
    } else if (currentUser) {
        post.likes -= 1;
        const index = post.likedBy.indexOf(currentUser.username);
        if (index > -1) {
            post.likedBy.splice(index, 1);
        }
        likeButton.innerHTML = "🤍 أعجبني";
    }
    allUsersPosts[index] = post;
    localStorage.setItem(username + 'AllPosts', JSON.stringify(allUsersPosts));
    displayAllPosts();
    displayUserPosts();
    
}

function displayLikes(username, index) {
    let userPosts = JSON.parse(localStorage.getItem(username + 'AllPosts')) || [];
    if (index < userPosts.length) {
        let post = userPosts[index];
        if (post && post.likedBy) {
            alert('المستخدمين الذين أعجبوا بهذا المنشور: ' + post.likedBy.join(', '));
        } else {
            alert('هذا المنشور ليس لديه إعجابات بعد.');
        }
    } else {
        alert('المنشور غير موجود.');
    }
}






function commentPost(index, username) {
  let userPosts = JSON.parse(localStorage.getItem(username + 'AllPosts'));
  if (userPosts && userPosts[index]) {
    let commentText = prompt('Enter your comment:');
    if (commentText) {
        let comment = {
          username: currentUser.username,
          text: commentText,
          userImage: currentUser.profilePhoto, // Add the user's image
          date: new Date().getTime() // Add the current date and time
        };
        if (!userPosts[index].comments) {
            userPosts[index].comments = [];
        }
        userPosts[index].comments.push(comment);
        localStorage.setItem(username + 'AllPosts', JSON.stringify(userPosts));

        // Update the posts in both pages
        displayAllPosts();
        displayUserPosts();
        
    }
  }
}

function displayComments(index, username) {
  // Remove the old modal if it exists
  let oldModal = document.getElementById('myModalC');
  if (oldModal) {
    document.body.removeChild(oldModal);
  }

  let userPosts = JSON.parse(localStorage.getItem(username + 'AllPosts'));
  if (userPosts && userPosts[index]) {
    let modalC = document.createElement('div');
    modalC.id = 'myModalC';
    modalC.className = 'modalC';

    let modalContent = document.createElement('div');
    modalContent.className = 'modal-contentC';

    userPosts[index].comments.forEach((comment, commentIndex) => {
      let commentHTML = `
        <div style="display: flex; margin-bottom: 10px; Max-width:350px; width:100%; gap:10px;">
          <img src="${comment.userImage}" alt="User Image" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid #ccc; margin-right: 10px; margin-top: 10px;">
          <div style="display: flex; flex-direction: column; flex-grow: 1; overflow-wrap: break-word;">
            <div style="font-weight: bold; font-size: 0.9em;">${comment.username}</div>
            <div style="font-size: 0.9em;">${timeSince(new Date(comment.date))}</div>
            <div style="width:100%; Max-width:250px; overflow-wrap: break-word; font-size: 0.8em;">${comment.text}</div>
            ${comment.username === currentUser.username ? `
              <div style="margin-top: 5px; display: flex; ">
                <button style="margin-right: 5px;" onclick="editComment(${index}, ${commentIndex}, '${username}')">تعديل</button>
                <button onclick="deleteComment(${index}, ${commentIndex}, '${username}')">حذف</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      modalContent.innerHTML += commentHTML;
    });

    modalC.appendChild(modalContent);
    document.body.appendChild(modalC);

    modalC.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modalC) {
        modalC.style.display = "none";
      }
    }
  }
  
}



// Function to update comments count
function updateCommentsCount(index, username, pageId) {
  let commentsLink = document.querySelector(`#${pageId} a[onclick="displayComments(${index}, '${username}')"]`);
  if (commentsLink) {
      let userPosts = JSON.parse(localStorage.getItem(username + 'AllPosts'));
      
  }
}



function closeModalC() {
  let modalC = document.getElementById('myModalC');
  if (modalC) {
    modalC.style.display = "none";
  }
  displayAllPosts();
  displayUserPosts();
  
}

function deleteComment(postIndex, commentIndex, username) {
  let userPosts = JSON.parse(localStorage.getItem(username + 'AllPosts'));
  if (userPosts && userPosts[postIndex]) {
    userPosts[postIndex].comments.splice(commentIndex, 1);
    localStorage.setItem(username + 'AllPosts', JSON.stringify(userPosts));
    displayAllPosts();
    displayUserPosts();
    
    closeModalC(); // Close the modal after deleting the comment
  }
}

function editComment(postIndex, commentIndex, username) {
  let userPosts = JSON.parse(localStorage.getItem(username + 'AllPosts'));
  if (userPosts && userPosts[postIndex]) {
    let newCommentText = prompt('Enter your new comment:');
    if (newCommentText) {
        let comment = {
          username: currentUser.username,
          text: newCommentText,
          userImage: userPosts[postIndex].comments[commentIndex].userImage, // Keep the original image
          date: new Date().getTime() // Update the date and time
        };
        userPosts[postIndex].comments[commentIndex] = comment;
        localStorage.setItem(username + 'AllPosts', JSON.stringify(userPosts));
        displayAllPosts();
        displayUserPosts();
        
        closeModalC(); // Close the modal before displaying the comments
        displayComments(postIndex, username); // Display the comments again after editing
    }
  }
}





function sharePost(index) {
  let userPosts = JSON.parse(localStorage.getItem(currentUser.username + 'Posts'));
  if (userPosts[index]) {
    userPosts[index].shares++;
    localStorage.setItem(currentUser.username + 'Posts', JSON.stringify(userPosts));
    displayAllPosts();
    displayUserPosts();
    
  }
}

window.onload = displayAllPosts();
window.onload = displayUserPosts();








function timeSince(date) {
var seconds = Math.floor((new Date().getTime() - date) / 1000);
var interval = Math.floor(seconds / 31536000);
if (interval > 1) {
return "منذ " + interval + " سنة";
}
interval = Math.floor(seconds / 2592000);
if (interval > 1) {
return "منذ " + interval + " شهور";
}
interval = Math.floor(seconds / 604800);
if (interval > 1) {
return "منذ " + interval + " أسابيع";
}
interval = Math.floor(seconds / 86400);
if (interval > 1) {
return "منذ " + interval + " أيام";
}
interval = Math.floor(seconds / 3600);
if (interval >= 1) {
if (interval === 1) {
return "منذ ساعة";
} else if (interval === 2) {
return "منذ ساعتين";
} else {
return "منذ " + interval + " ساعات";
}
}
interval = Math.floor(seconds / 60);
if (interval >= 1) {
return "منذ " + interval + " دقائق";
}
return "منذ " + Math.floor(seconds) + " ثواني";
}
function showLoginForm() { document.getElementById('login').style.display = 'block'; document.getElementById('register').style.display = 'none';
}
function showRegisterForm() { document.getElementById('login').style.display = 'none'; document.getElementById('register').style.display = 'block';
}
function navigate(event) {
event.preventDefault();
var target = event.target;
while (target != null && target.nodeName != "A") {
target = target.parentNode;
}
if (target != null) {
navigateTo(target.hash.substring(1));
}
}
function openPopup() { document.getElementById('popup').style.display = 'block';
}
function closePopup() { document.getElementById('popup').style.display = 'none';
} document.getElementById('openPopupButtonMain').onclick = openPopup; document.getElementById('openPopupButtonUser').onclick = openPopup; document.getElementById('closePopupButton').onclick = closePopup; document.getElementById('postButton').onclick = createPost;

function navigateTo(pageId) {
    let pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    } 
    let page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
    } else {
        console.log('Page ' + pageId + ' not found');
    }
    let navLinks = document.querySelectorAll('nav ul li a');
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }
    let navLink = document.querySelector(`nav ul li a[href="#${pageId}"]`);
    if (navLink) {
        navLink.classList.add('active');
    } else {
        console.log('NavLink ' + pageId + ' not found');
    }
}

document.getElementById('profilePhotoo').addEventListener('click', function() {
    navigateTo('profile');
});

function openModal(index) {
  var modal = document.getElementById('myModal-s-post-' + index);
  modal.style.display = "block";
}

function closeModal(index) {
  var modal = document.getElementById('myModal-s-post-' + index);
  modal.style.display = "none";
}

function openModal1(index) {
  var modalP = document.getElementById('myModal-s-post1-' + index);
  modalP.style.display = "block";
}
function closeModal1(index) {
  var modalP = document.getElementById('myModal-s-post1-' + index);
  modalP.style.display = "none";
}

function toggleMode() {
    var body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('mode', 'dark-mode'); 
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('mode', 'light-mode');
    }
}

// Check localStorage before setting default mode
var mode = localStorage.getItem('mode');
if (mode === 'dark-mode') {
    document.body.classList.add('dark-mode');
} else if (mode === 'light-mode') {
    document.body.classList.add('light-mode');
} else {
    // Set default mode here if no mode is set in localStorage
    document.body.classList.add('light-mode');
}



toggleMode();