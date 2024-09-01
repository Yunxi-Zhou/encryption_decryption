let db;

// 初始化数据库
function initDB() {
    const dbName = 'NotebookDB';
    const dbVersion = 1;
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
        console.error("数据库错误: " + event.target.error);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("数据库连接成功");
        loadNotesFromDatabase();
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
        console.log("数据库升级成功");
    };
}

// 获取DOM元素
const notebookList = document.querySelector('.notebook ul');
const addNoteBtn = document.querySelector('.add-note');
const removeNoteBtn = document.querySelector('.remove-note');

// 从数据库加载笔记
function loadNotesFromDatabase() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        return;
    }
    const transaction = db.transaction(["notes"], "readonly");
    const objectStore = transaction.objectStore("notes");
    const request = objectStore.getAll();

    request.onerror = (event) => {
        console.error("加载笔记失败: " + event.target.error);
    };

    request.onsuccess = (event) => {
        const notes = event.target.result;
        notes.forEach(note => {
            addNoteToDOM(note.text, note.id);
        });
    };
}

// 添加笔记到DOM
function addNoteToDOM(text, id) {
    const noteItem = document.createElement('li');
    noteItem.textContent = text;
    noteItem.dataset.id = id;
    noteItem.addEventListener('dblclick', editNote);
    notebookList.insertBefore(noteItem, addNoteBtn);
}

// 添加笔记到数据库
function addNoteToDatabase(text) {
    const transaction = db.transaction(["notes"], "readwrite");
    const objectStore = transaction.objectStore("notes");
    const request = objectStore.add({ text: text });

    request.onerror = (event) => {
        console.error("添加笔记失败: " + event.target.error);
    };

    request.onsuccess = (event) => {
        console.log("笔记已成功保存到数据库");
        addNoteToDOM(text, event.target.result);
    };
}

// 添加笔记
function addNote(text) {
    addNoteToDatabase(text);
}

// 创建弹窗
function createPopup(title, content, onConfirm) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>${title}</h2>
            ${content}
            <div class="popup-buttons">
                <button class="confirm">确认</button>
                <button class="cancel">取消</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    const confirmBtn = popup.querySelector('.confirm');
    const cancelBtn = popup.querySelector('.cancel');

    confirmBtn.addEventListener('click', () => {
        onConfirm();
        document.body.removeChild(popup);
    });

    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// 编辑笔记
function editNote(event) {
    const noteItem = event.target;
    const oldText = noteItem.textContent;
    const id = parseInt(noteItem.dataset.id);

    createPopup('编辑笔记', `<textarea id="editNoteText">${oldText}</textarea>`, () => {
        const newText = document.getElementById('editNoteText').value;
        if (newText.trim() !== '' && newText !== oldText) {
            updateNoteInDatabase(id, newText);
            noteItem.textContent = newText;
        }
    });
}

// 在数据库中更新笔记
function updateNoteInDatabase(id, newText) {
    const transaction = db.transaction(["notes"], "readwrite");
    const objectStore = transaction.objectStore("notes");
    const request = objectStore.get(id);

    request.onerror = (event) => {
        console.error("获取笔记失败: " + event.target.error);
    };

    request.onsuccess = (event) => {
        const data = event.target.result;
        data.text = newText;
        const updateRequest = objectStore.put(data);
        
        updateRequest.onerror = (event) => {
            console.error("更新笔记失败: " + event.target.error);
        };
        
        updateRequest.onsuccess = (event) => {
            console.log("笔记已成功更新");
        };
    };
}

// 从数据库和DOM中删除最近的笔记
function removeLatestNote() {
    const transaction = db.transaction(["notes"], "readwrite");
    const objectStore = transaction.objectStore("notes");
    const request = objectStore.openCursor(null, "prev");

    request.onerror = (event) => {
        console.error("删除笔记失败: " + event.target.error);
    };

    request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const deleteRequest = cursor.delete();
            deleteRequest.onsuccess = () => {
                console.log("最近的笔记已从数据库中删除");
                const noteToRemove = notebookList.querySelector(`li[data-id="${cursor.value.id}"]`);
                if (noteToRemove) {
                    notebookList.removeChild(noteToRemove);
                }
            };
        } else {
            console.log("没有笔记可删除");
        }
    };
}

// 添加新笔记按钮事件监听器
addNoteBtn.addEventListener('click', () => {
    createPopup('添加新笔记', '<textarea id="newNoteText" placeholder="请输入笔记内容"></textarea>', () => {
        const noteText = document.getElementById('newNoteText').value;
        if (noteText && noteText.trim() !== '') {
            addNote(noteText);
        }
    });
});

// 删除最近笔记按钮事件监听器
removeNoteBtn.addEventListener('click', removeLatestNote);

// 页面加载时初始化数据库
document.addEventListener('DOMContentLoaded', initDB);

// 导出 addNote 函数供其他模块使用
export { addNote };