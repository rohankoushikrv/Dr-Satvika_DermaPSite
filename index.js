
import { GoogleGenAI } from "@google/genai";

// Configuration for AI Bio
const CONFIG = {
  name: "Dr. Sarah Jenkins",
  specialty: "Dermatology Resident (PG-1)",
  background: "A passionate first-year post-graduate resident focused on dermatopathology, clinical skincare science, and medical research. Dedicated to bringing clinical expertise to bedside patient care."
};

// Initialize GenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Fetch AI Generated Bio from Gemini
 */
async function generateBio() {
  const bioContainer = document.getElementById('ai-bio-content');
  if (!bioContainer) return;

  bioContainer.innerHTML = '<i class="fas fa-spinner fa-spin mr-2 text-blue-600"></i> Synthesizing my resident profile...';
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, and compassionate medical biography for ${CONFIG.name}, who is a ${CONFIG.specialty}. Background: ${CONFIG.background}. Highlight her first-year status and commitment to learning. Keep it under 80 words.`,
    });
    bioContainer.textContent = response.text || "Dedicated to pioneering skin health with academic rigor and clinical compassion.";
  } catch (error) {
    console.error("Gemini Error:", error);
    bioContainer.textContent = "Currently training in my first year of residency with a commitment to evidence-based dermatology and patient-centered care.";
  }
}

/**
 * Handle Profile Picture Upload
 */
function setupImageUpload() {
  const uploadBtn = document.getElementById('upload-btn');
  const fileInput = document.getElementById('file-input');
  const profileImg = document.getElementById('profile-img');

  if (uploadBtn && fileInput && profileImg) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profileImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

/**
 * Handle Mobile Menu Toggle
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    
    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupImageUpload();
  generateBio();

  // Handle manual regenerate button
  const regenBtn = document.getElementById('regen-bio');
  if (regenBtn) {
    regenBtn.addEventListener('click', generateBio);
  }
});
