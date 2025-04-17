/**
 * AI生活规划智能分析页面的交互功能
 * @author 健康管理团队
 * @version 2.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const avatarBtn = document.getElementById('avatarBtn');
    const checkInBtn = document.getElementById('checkInBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    // 环形进度效果
    initializeCircleProgress();
    
    /**
     * 初始化环形进度条
     */
    function initializeCircleProgress() {
        const completionCircle = document.querySelector('.completion-circle');
        const completionPercentage = 14; // 当前完成率
        
        // 设置环形进度条
        completionCircle.style.background = `conic-gradient(
            #304FFF 0% ${completionPercentage}%, 
            #e0e6ff ${completionPercentage}% 100%
        )`;
    }
    
    /**
     * 显示设置弹窗
     */
    function showSettings() {
        // 创建模态弹窗
        const modal = document.createElement('div');
        modal.className = 'settings-modal';
        
        // 创建弹窗内容
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // 创建标题
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            <h2>设置</h2>
            <button class="close-btn">&times;</button>
        `;
        
        // 创建设置项
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = `
            <div class="setting-item">
                <label>打卡提醒</label>
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="setting-item">
                <label>推送频率</label>
                <select>
                    <option value="daily">每日</option>
                    <option value="weekly" selected>每周</option>
                    <option value="monthly">每月</option>
                </select>
            </div>
            <div class="setting-item">
                <label>单位设置</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="unit" value="mmol" checked>
                        mmol/L
                    </label>
                    <label>
                        <input type="radio" name="unit" value="mg">
                        mg/dL
                    </label>
                </div>
            </div>
        `;
        
        // 创建底部按钮
        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';
        modalFooter.innerHTML = `
            <button class="cancel-btn">取消</button>
            <button class="save-btn">保存</button>
        `;
        
        // 组装弹窗
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modal.appendChild(modalContent);
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .settings-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .modal-content {
                background-color: #fff;
                border-radius: 12px;
                width: 85%;
                max-width: 400px;
                overflow: hidden;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h2 {
                font-size: 18px;
                margin: 0;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #888;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .setting-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
            }
            
            input:checked + .slider {
                background-color: #304FFF;
            }
            
            input:checked + .slider:before {
                transform: translateX(26px);
            }
            
            .slider.round {
                border-radius: 24px;
            }
            
            .slider.round:before {
                border-radius: 50%;
            }
            
            select {
                padding: 8px;
                border-radius: 6px;
                border: 1px solid #ddd;
                background-color: #fff;
            }
            
            .radio-group {
                display: flex;
                gap: 15px;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                padding: 15px 20px;
                border-top: 1px solid #eee;
                gap: 10px;
            }
            
            .cancel-btn, .save-btn {
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                border: none;
            }
            
            .cancel-btn {
                background-color: #f1f1f1;
                color: #333;
            }
            
            .save-btn {
                background-color: #304FFF;
                color: white;
            }
        `;
        document.head.appendChild(style);
        
        // 添加事件监听
        const closeBtn = modal.querySelector('.close-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const saveBtn = modal.querySelector('.save-btn');
        
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        cancelBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        saveBtn.addEventListener('click', function() {
            // 保存设置的逻辑（实际应用中可连接后端API）
            showToast('设置已保存');
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }
    
    /**
     * 显示打卡页面
     */
    function showCheckInPage() {
        // 在实际应用中，这里应该跳转到打卡页面
        // 这里我们只是简单地显示一个提示
        showToast('打卡页面即将上线');
    }
    
    /**
     * 显示提示信息
     * @param {string} message - 提示信息
     */
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // 添加样式
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '20px';
        toast.style.fontSize = '14px';
        toast.style.zIndex = '1000';
        
        document.body.appendChild(toast);
        
        // 2秒后移除
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 2000);
    }
    
    /**
     * 添加底部导航交互
     */
    function initializeNavigation() {
        navItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // 移除所有active类
                navItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('svg').setAttribute('fill', '#999');
                });
                
                // 添加active类到当前项
                this.classList.add('active');
                this.querySelector('svg').setAttribute('fill', '#304FFF');
                
                // 根据索引执行不同操作
                switch(index) {
                    case 0: // 首页
                        // 已经在首页，不做操作
                        break;
                    case 1: // 打卡
                        showCheckInPage();
                        break;
                    case 2: // 记录
                        showToast('记录页面即将上线');
                        break;
                    case 3: // 我的
                        showSettings();
                        break;
                }
            });
        });
    }
    
    // 监听按钮点击
    avatarBtn.addEventListener('click', showSettings);
    checkInBtn.addEventListener('click', showCheckInPage);
    
    // 初始化导航
    initializeNavigation();
    
    /**
     * 模拟加载打卡数据
     */
    function initializeData() {
        // 这里可以添加实际的数据获取逻辑
        console.log('初始化数据完成');
        
        // 模拟添加点击事件到建议项
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', function() {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            });
        });
    }
    
    // 初始化页面数据
    initializeData();
}); 