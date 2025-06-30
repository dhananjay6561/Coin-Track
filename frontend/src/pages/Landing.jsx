import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, TrendingUp, Shield, Smartphone, BarChart3, PieChart, Wallet } from 'lucide-react';

const FloatingIcon = ({ Icon, position, delay, color }) => (
  <div
    className={`absolute ${position} ${color} p-3 rounded-xl backdrop-blur-sm bg-white/10 shadow-lg animate-bounce`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '3s',
    }}
  >
    <Icon size={24} />
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div
    className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-indigo-100/50"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-white" size={24} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Landing = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    particles.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      particles.current.forEach((particle, i) => {
        particles.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden w-full">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #e0e7ff 100%)' }}
      />

      {/* Floating Icons */}
      <FloatingIcon Icon={DollarSign} position="top-20 left-10" delay={0} color="text-green-500" />
      <FloatingIcon Icon={TrendingUp} position="top-32 right-16" delay={1} color="text-blue-500" />
      <FloatingIcon Icon={PieChart} position="bottom-32 left-20" delay={2} color="text-purple-500" />
      <FloatingIcon Icon={BarChart3} position="bottom-20 right-10" delay={1.5} color="text-indigo-500" />

      {/* Navigation */}
      <nav className="relative z-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Wallet className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                ExpenseTracker
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Features</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">About</a>
              <Link
                to="/login"
                className="px-6 py-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Track Your Expenses
                </span>
                <br />
                <span className="text-gray-800">Like Never Before</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Take control of your finances with our intuitive expense tracking platform. 
                Beautiful charts, smart insights, and seamless experience across all devices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-800 rounded-2xl font-semibold text-lg hover:bg-white/90 border border-indigo-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>

            {/* Demo Preview */}
            <div className="relative max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100/50">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Beautiful Dashboard</h3>
                    <p className="text-gray-600">Your financial data visualized perfectly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 w-full bg-white/30 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">ExpenseTracker</span>?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your finances effectively in one beautiful platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                icon={BarChart3}
                title="Smart Analytics"
                description="Get detailed insights into your spending patterns with beautiful charts and intelligent categorization."
                delay={0}
              />
              <FeatureCard
                icon={Smartphone}
                title="Mobile First"
                description="Perfectly designed for mobile and desktop. Track expenses on the go with our responsive interface."
                delay={100}
              />
              <FeatureCard
                icon={Shield}
                title="Secure & Private"
                description="Your financial data is encrypted and secure. We never share your information with third parties."
                delay={200}
              />
              <FeatureCard
                icon={TrendingUp}
                title="Budget Tracking"
                description="Set budgets and get real-time alerts when you're approaching your spending limits."
                delay={100}
              />
              <FeatureCard
                icon={PieChart}
                title="Category Management"
                description="Organize expenses into custom categories for better financial organization and clarity."
                delay={200}
              />
              <FeatureCard
                icon={DollarSign}
                title="Multi-Currency"
                description="Support for multiple currencies with real-time exchange rates for international users."
                delay={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-8 sm:p-12 text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Ready to Take Control?</h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90">
                Join thousands of users who have transformed their financial habits
              </p>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
              >
                <span>Start Your Journey</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;