const fileInput = document.getElementById('fileInput');
const formatSelect = document.getElementById('formatSelect');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');

const originalPreview = document.getElementById('originalPreview');
const convertedPreview = document.getElementById('convertedPreview');

// 显示原图
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            originalPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 转换并显示新图
convertBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('请选择文件！');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const newFormat = formatSelect.value;
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);

                // 设置下载链接
                downloadLink.href = url;
                downloadLink.download = 'converted.' + (newFormat === 'image/png' ? 'png' : 'jpg');
                downloadLink.style.display = 'inline';
                downloadLink.textContent = '下载转换后的文件';

                // 显示转换后预览
                convertedPreview.src = url;
            }, newFormat);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});
