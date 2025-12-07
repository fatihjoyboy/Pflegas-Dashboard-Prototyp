import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Loader2, X } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';

const ImageAnalysisPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setAnalysis(''); // Reset previous analysis
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      // Extract base64 data (remove "data:image/jpeg;base64,")
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      
      const result = await analyzeImage(base64Data, prompt, mimeType);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysis('');
    setPrompt('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Image
            </h3>
            
            {!selectedImage ? (
              <div 
                className={`
                  border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors
                  ${dragActive ? 'border-primary bg-primary-light' : 'border-gray-300 hover:border-primary-dark bg-surface'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  id="image-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-dark">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
                </label>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-64 bg-surface flex items-center justify-center group">
                 <img 
                   src={selectedImage} 
                   alt="Preview" 
                   className="max-h-full max-w-full object-contain"
                 />
                 <button 
                   onClick={clearImage}
                   className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                 >
                   <X className="w-4 h-4" />
                 </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <label className="block text-sm font-medium text-dark mb-2">
               Question or Prompt (Optional)
             </label>
             <textarea
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="What's in this image? Describe the colors..."
               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-24 bg-white text-dark placeholder-gray-400"
             />
             <button
              onClick={handleAnalyze}
              disabled={!selectedImage || isLoading}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
             >
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
               {isLoading ? 'Analyzing...' : 'Analyze Image'}
             </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full min-h-[400px]">
          <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Analysis Result
          </h3>
          
          <div className="flex-1 bg-surface rounded-lg p-6 border border-gray-100 overflow-y-auto">
            {analysis ? (
              <p className="whitespace-pre-wrap text-dark leading-relaxed text-sm">
                {analysis}
              </p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                {isLoading ? (
                   <div className="flex flex-col items-center space-y-3">
                     <Loader2 className="w-8 h-8 animate-spin text-primary" />
                     <p className="text-sm">Gemini is looking at your image...</p>
                   </div>
                ) : (
                  <p className="text-sm">Upload an image and click analyze to see results.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisPage;