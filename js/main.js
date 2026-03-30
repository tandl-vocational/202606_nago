// ========================================
// スムーズスクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // モバイルメニューを閉じる
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ========================================
// モバイルメニュー
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // アイコンの切り替え
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// メニュー外をクリックで閉じる
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// ========================================
// ヘッダーのスクロール効果
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール時にヘッダーに影を追加
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========================================
// ページトップボタン
// ========================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// スクロールアニメーション
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象の要素
const animatedElements = document.querySelectorAll(`
    .feature-card,
    .qualification-card,
    .timeline-item,
    .cost-card,
    .requirement-box,
    .info-box,
    .contact-card
`);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ========================================
// フォームバリデーション（将来の拡張用）
// ========================================
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ========================================
// カウントアップアニメーション
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('ja-JP');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('ja-JP');
        }
    }, 16);
}

// ========================================
// レスポンシブ対応
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // ウィンドウサイズが変わったときの処理
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }, 250);
});

// ========================================
// ページ読み込み時の初期化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('デジタル経理人財養成科 LP initialized');

    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // 現在の日付をチェックして募集期間の表示を更新
    updateRecruitmentStatus();
});

// ========================================
// 募集期間のステータス更新
// ========================================
function updateRecruitmentStatus() {
    const now = new Date();
    const recruitmentStart = new Date('2026-02-27');
    const recruitmentEnd = new Date('2026-03-27');

    // 募集期間中かどうかをチェック
    if (now >= recruitmentStart && now <= recruitmentEnd) {
        console.log('現在募集期間中です');
    } else if (now > recruitmentEnd) {
        console.log('募集期間は終了しました');
    } else {
        console.log('募集開始前です');
    }
}

// ========================================
// ユーティリティ関数
// ========================================

// 要素が画面内に表示されているかチェック
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// スクロール位置に応じてナビゲーションのハイライトを更新
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation);

// ========================================
// パフォーマンス最適化
// ========================================

// 画像の遅延読み込み（Lazy Loading）
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Intersection Observerでフォールバック
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// エラーハンドリング
// ========================================
window.addEventListener('error', (e) => {
    console.error('エラーが発生しました:', e.message);
});

// ========================================
// アクセシビリティ対応
// ========================================

// フォーカス管理
document.addEventListener('keydown', (e) => {
    // Tabキーでのナビゲーション時のフォーカス表示
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Escapeキーでモバイルメニューを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ========================================
// 外部リンクの処理
// ========================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ========================================
// お問い合わせリンクのトラッキング（オプション）
// ========================================
const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const type = link.href.startsWith('tel:') ? 'phone' : 'email';
        console.log(`Contact link clicked: ${type}`);
    });
});
