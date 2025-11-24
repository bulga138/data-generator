/**
 * Utility Functions for Data Formatting and Export
 */

/**
 * Format data as pretty-printed JSON
 * @param {Array} data - Data array
 * @returns {string} Formatted JSON
 */
export function formatAsJSON(data) {
    return JSON.stringify(data, null, 2);
}

/**
 * Format data as CSV with dynamic headers
 * @param {Array} data - Data array
 * @param {Array} selectedFields - Selected field names
 * @returns {string} CSV string
 */
export function formatAsCSV(data) {
    if (!data || data.length === 0) {
        return '';
    }
    
    // Extract all unique keys from the data
    const allKeys = new Set();
    data.forEach(record => {
        Object.keys(record).forEach(key => {
            if (typeof record[key] === 'object' && record[key] !== null) {
                // Flatten nested objects
                Object.keys(record[key]).forEach(subKey => {
                    allKeys.add(`${key}_${subKey}`);
                });
            } else {
                allKeys.add(key);
            }
        });
    });
    
    const headers = Array.from(allKeys);
    
    // Create CSV header row
    let csv = headers.join(',') + '\n';
    
    // Create data rows
    data.forEach(record => {
        const row = headers.map(header => {
            // Handle nested objects
            if (header.includes('_')) {
                const [parent, child] = header.split('_');
                const value = record[parent]?.[child];
                return value !== undefined ? `"${String(value).replace(/"/g, '""')}"` : '';
            }
            
            const value = record[header];
            if (value === undefined || value === null) return '';
            if (typeof value === 'object') return '';
            return `"${String(value).replace(/"/g, '""')}"`;
        });
        csv += row.join(',') + '\n';
    });
    
    return csv;
}

/**
 * Format data as HTML table
 * @param {Array} data - Data array
 * @returns {string} HTML table rows
 */
export function formatAsTableRows(data) {
    if (!data || data.length === 0) {
        return `<tr><td colspan="3" class="text-center text-muted py-5">
                    <i class="bi bi-inbox display-4 d-block mb-3"></i>
                    No data generated yet.
                </td></tr>`;
    }
    
    let html = '';
    data.forEach((record, index) => {
        html += `<tr>
            <td>${index + 1}</td>
            <td><span class="badge bg-primary">${record.country || 'N/A'}</span></td>
            <td>${formatRecordForTable(record)}</td>
        </tr>`;
    });
    
    return html;
}

/**
 * Format a single record for table display
 * @param {Object} record - Data record
 * @returns {string} Formatted HTML
 */
function formatRecordForTable(record) {
    let html = '<div class="row g-2">';
    
    Object.keys(record).forEach(key => {
        if (key === 'country' || key === 'type') return; // Skip meta fields
        
        const value = record[key];
        
        if (typeof value === 'object' && value !== null) {
            // Nested object
            Object.keys(value).forEach(subKey => {
                html += `<div class="col-md-6">
                    <small class="text-muted">${formatLabel(key + '_' + subKey)}:</small><br>
                    <code>${value[subKey]}</code>
                </div>`;
            });
        } else if (value !== null && value !== undefined) {
            html += `<div class="col-md-6">
                <small class="text-muted">${formatLabel(key)}:</small><br>
                <code>${value}</code>
            </div>`;
        }
    });
    
    html += '</div>';
    return html;
}

/**
 * Format field name as readable label
 * @param {string} fieldName - Field name
 * @returns {string} Formatted label
 */
function formatLabel(fieldName) {
    return fieldName
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

/**
 * Download file to user's computer
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type ('success', 'error', 'info')
 */
export function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-danger' : 'alert-info';
    
    toastContainer.innerHTML = `
        <div class="alert ${alertClass} fade show d-flex align-items-center shadow-sm" role="alert">
            <div class="flex-grow-1 me-3">
                ${message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}
