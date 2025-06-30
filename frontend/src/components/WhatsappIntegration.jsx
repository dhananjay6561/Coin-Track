import React, { useState } from 'react';
import { MessageCircle, Copy, ExternalLink, Smartphone, Check } from 'lucide-react';

const WhatsAppIntegration = () => {
  const phoneNumber = "+1 415 523 8886";
  const joinCode = "join heat-tight";
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(joinCode);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '').replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 sm:p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Send a WhatsApp message
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Use WhatsApp and send a message from your device to
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Instructions */}
        <div className="space-y-6">
          {/* Phone Number Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
              </div>
              <button
                onClick={() => copyToClipboard(phoneNumber, 'phone')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Copy phone number"
              >
                {copiedItem === 'phone' ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {/* Join Code Section */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-600 mb-3">with code</p>
              <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <code className="text-sm font-mono text-indigo-700 font-semibold">
                  {joinCode}
                </code>
                <button
                  onClick={() => copyToClipboard(joinCode, 'code')}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors duration-200"
                  title="Copy join code"
                >
                  {copiedItem === 'code' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Open WhatsApp Button */}
            <button
              onClick={openWhatsApp}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Open WhatsApp
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side - QR Code and Mobile Instructions */}
        <div className="text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                Scan the QR code on mobile
              </h4>
            </div>
            
            {/* QR Code */}
<div className="w-48 h-48 mx-auto bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-6 shadow-inner">
  <img 
    src="/qr.svg" 
    alt="WhatsApp QR Code"
    className="w-44 h-44 rounded-xl border border-gray-200 object-cover"
  />
</div>

            
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-2 h-2 text-white" />
              </div>
              <p className="text-sm font-medium text-blue-700">
                Twilio WhatsApp Sandbox
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OR Divider */}
      <div className="flex items-center my-8 sm:my-10">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-4 bg-white rounded-full border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-gray-500">OR</span>
        </div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Usage Examples */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-purple-600" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900">
            How to add expenses
          </h4>
        </div>
        
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Send natural language messages to instantly track your expenses:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
              <code className="text-sm text-indigo-700 font-semibold break-words">
                "Spent ₹500 on groceries"
              </code>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
              <code className="text-sm text-purple-700 font-semibold break-words">
                "Paid ₹1200 for transport"
              </code>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-medium text-green-800">
              Your expenses will be automatically categorized and synced to your dashboard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;