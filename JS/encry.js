import { addNote } from './notebook.js';

// 更复杂的加密函数（使用简单的替换密码）
function encrypt(text, shift = 3) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
    return text.split('').map(char => {
        const index = alphabet.indexOf(char);
        return index !== -1 ? shiftedAlphabet[index] : char;
    }).join('');
}

// 解密函数
function decrypt(text, shift = 3) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
    return text.split('').map(char => {
        const index = shiftedAlphabet.indexOf(char);
        return index !== -1 ? alphabet[index] : char;
    }).join('');
}

// 获取DOM元素
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const notificationBox = document.querySelector('.notification-box');
const shiftInput = document.createElement('input');
shiftInput.type = 'number';
shiftInput.value = '3';
shiftInput.min = '1';
shiftInput.max = '61';
shiftInput.id = 'shiftInput';
document.querySelector('.button-group').appendChild(shiftInput);

// 添加通知函数
function addNotification(message) {
    const notification = document.createElement('p');
    notification.textContent = message;
    notificationBox.appendChild(notification);
    setTimeout(() => {
        notificationBox.removeChild(notification);
    }, 3000);
}

// 复制到剪贴板函数
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        addNotification('Result copied to clipboard');
    }, (err) => {
        console.error("Can't copied to clipboard", err);
        addNotification('Copy failed, please copy manually');
    });
}

// 添加加密按钮事件监听器
encryptBtn.addEventListener('click', () => {
    const input = inputText.value;
    const shift = parseInt(shiftInput.value);
    if (input.trim() === '') {
        addNotification('Please enter plain text to be encrypted');
        return;
    }
    if (isNaN(shift) || shift < 1 || shift > 61) {
        addNotification('Please enter the Secret Key number between 1 - 61');
        return;
    }
    const encrypted = encrypt(input, shift);
    outputText.value = encrypted;
    addNotification(`Encryption result: ${encrypted}`);
    addNote(`Encryption result: ${encrypted}`);
    copyToClipboard(encrypted);
});

// 添加解密按钮事件监听器
decryptBtn.addEventListener('click', () => {
    const input = inputText.value;
    const shift = parseInt(shiftInput.value);
    if (input.trim() === '') {
        addNotification('Please enter plain text to be decrypted');
        return;
    }
    if (isNaN(shift) || shift < 1 || shift > 61) {
        addNotification('Please enter the Secret Key number between 1 - 61');
        return;
    }
    const decrypted = decrypt(input, shift);
    outputText.value = decrypted;
    addNotification('Successfully decrypted!!!');
    addNotification(`Decryption result: ${decrypted}`);
    addNote(`Decryption result: ${decrypted}`);
    copyToClipboard(decrypted);
});

// 添加输出框点击事件监听器（用于复制结果）
outputText.addEventListener('click', () => {
    if (outputText.value.trim() !== '') {
        copyToClipboard(outputText.value);
    }
});
