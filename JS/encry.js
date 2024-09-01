// 导入所需的加密库（这里假设使用CryptoJS）
import CryptoJS from 'crypto-js';

// 定义密钥
const secretKey = 'mySecretKey123';

// 加密函数
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// 解密函数
function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// 获取DOM元素
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');

// 添加加密按钮事件监听器
encryptBtn.addEventListener('click', () => {
    const text = inputText.value;
    const encryptedText = encrypt(text);
    outputText.value = encryptedText;
});

// 添加解密按钮事件监听器
decryptBtn.addEventListener('click', () => {
    const ciphertext = inputText.value;
    try {
        const decryptedText = decrypt(ciphertext);
        outputText.value = decryptedText;
    } catch (error) {
        outputText.value = '解密失败，请确保输入的是有效的加密文本。';
    }
});
