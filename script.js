function updateDateTime() {
    const now = new Date();
    
    // Update time in 12-hour format without AM/PM
    const timeElement = document.getElementById('time');
    let hours = now.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12; // convert 0 to 12
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    
    // Update date with numeric format
    const dateElement = document.getElementById('date');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-based
    const year = now.getFullYear();
    
    dateElement.textContent = `${day}/${month}/${year}`;
}

// Update time and date every second
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();

// Snow effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // حجم عشوائي للدائرة
    const size = Math.random() * 5 + 3;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    // موقع عشوائي على عرض الشاشة
    snowflake.style.left = `${Math.random() * 100}vw`;
    
    // سرعة عشوائية للسقوط
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    // شفافية عشوائية
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;
    
    // إضافة ظل خفيف
    snowflake.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
    
    document.body.appendChild(snowflake);
    
    // إزالة الدائرة بعد انتهاء الحركة
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// إنشاء دوائر جديدة كل 200 مللي ثانية (تقليل العدد لتحسين الأداء)
setInterval(createSnowflake, 200);

// Schedule configuration
const schedule = [
    { period: 1, startTime: '07:20', endTime: '08:05' },
    { period: 2, startTime: '08:05', endTime: '08:50' },
    { period: 3, startTime: '08:50', endTime: '09:35' },
    { period: 4, startTime: '09:35', endTime: '10:20' },
    { period: 'Break', startTime: '10:20', endTime: '10:40' },
    { period: 5, startTime: '10:40', endTime: '11:20' },
    { period: 6, startTime: '11:20', endTime: '12:05' },
    { period: 7, startTime: '12:05', endTime: '12:50' },
    { period: 8, startTime: '12:50', endTime: '13:30' }
];

function updateCurrentPeriod() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();
    const periodInfoElement = document.getElementById('currentPeriodInfo');
    const progressBar = document.getElementById('timeProgress');
    const timeRemainingElement = document.getElementById('timeRemaining');

    // Find current period
    let currentPeriod = null;
    for (const period of schedule) {
        const [startHour, startMinute] = period.startTime.split(':').map(Number);
        const [endHour, endMinute] = period.endTime.split(':').map(Number);
        
        const startTimeMinutes = startHour * 60 + startMinute;
        const endTimeMinutes = endHour * 60 + endMinute;

        if (currentTime >= startTimeMinutes && currentTime < endTimeMinutes) {
            currentPeriod = {
                ...period,
                startTimeMinutes,
                endTimeMinutes
            };
            break;
        }
    }

    if (currentPeriod) {
        // Calculate progress including seconds for smoother transition
        const totalDurationSeconds = (currentPeriod.endTimeMinutes - currentPeriod.startTimeMinutes) * 60;
        const elapsedSeconds = ((currentTime - currentPeriod.startTimeMinutes) * 60) + currentSeconds;
        const progress = (elapsedSeconds / totalDurationSeconds) * 100;
        
        // Update display
        periodInfoElement.textContent = `Period ${currentPeriod.period}`;
        progressBar.style.width = `${progress}%`;
        
        // تحديث لون التدرج بناءً على الوقت المتبقي
        const remainingSeconds = totalDurationSeconds - elapsedSeconds;
        const remainingPercentage = (remainingSeconds / totalDurationSeconds) * 100;
        const hue = Math.max(0, Math.min(60, remainingPercentage));
        progressBar.style.background = `linear-gradient(to right, 
            hsl(${hue}, 90%, 60%), 
            hsl(${Math.max(0, hue - 30)}, 90%, 60%)
        )`;
        
        // عرض الوقت المتبقي
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        if (remainingMinutes <= 1) {
            // عرض الثواني عندما يتبقى أقل من دقيقة
            const remainingSecondsDisplay = Math.floor(remainingSeconds % 60);
            timeRemainingElement.textContent = `${remainingSecondsDisplay} seconds remaining`;
        } else {
            timeRemainingElement.textContent = `${remainingMinutes} minutes remaining`;
        }
        // جعل لون النص أبيض دائماً
        timeRemainingElement.style.color = '#ffffff';
    } else {
        // No current period
        periodInfoElement.textContent = 'No ongoing period';
        progressBar.style.width = '0%';
        timeRemainingElement.textContent = '';
        timeRemainingElement.style.color = '#ffffff';
    }
}

// تحديث كل ثانية للحصول على حركة سلسة
setInterval(updateCurrentPeriod, 1000);
updateCurrentPeriod();

function updateDayName() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[new Date().getDay()];
    document.getElementById('dayName').textContent = dayName;
}

// استدعاء الدالة عند تحميل الصفحة
updateDayName(); 

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // تحويل إلى نظام 12 ساعة
    hours = hours % 12;
    hours = hours ? hours : 12; // إذا كانت الساعة 0 نجعلها 12
    hours = hours.toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
} 