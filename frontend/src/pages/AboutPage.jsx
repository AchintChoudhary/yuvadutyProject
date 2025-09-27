import React from 'react';
import { Users, Target, Heart, Award, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Former city planner with 15 years of experience in urban development and community engagement.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Tech entrepreneur passionate about using technology to solve civic problems and improve communities.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Community Relations Director',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'PhD in Public Policy with expertise in citizen engagement and democratic participation.'
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'UX designer focused on creating intuitive interfaces that make civic participation accessible to everyone.'
    }
  ];

  const achievements = [
    {
      number: '50,000+',
      label: 'Issues Resolved',
      description: 'Community problems solved through our platform'
    },
    {
      number: '200+',
      label: 'Cities Served',
      description: 'Communities across the country using CivicConnect'
    },
    {
      number: '1M+',
      label: 'Active Users',
      description: 'Citizens engaged in improving their neighborhoods'
    },
    {
      number: '95%',
      label: 'Satisfaction Rate',
      description: 'Users who would recommend our platform'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe that strong communities are built through active citizen participation and collaborative problem-solving.'
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'We promote open communication between citizens and government, ensuring accountability and trust.'
    },
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We give every citizen a voice and the tools to make meaningful change in their community.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from our platform to our community support.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'CivicConnect Founded',
      description: 'Started as a small project to help local communities report infrastructure issues.'
    },
    {
      year: '2021',
      title: 'First Major City Partnership',
      description: 'Partnered with our first major city government to streamline citizen reporting.'
    },
    {
      year: '2022',
      title: 'National Expansion',
      description: 'Expanded to serve over 50 cities across the United States.'
    },
    {
      year: '2023',
      title: 'Mobile App Launch',
      description: 'Launched our mobile app, making civic engagement more accessible than ever.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Integrated AI to help categorize and prioritize community issues more effectively.'
    },
    {
      year: '2025',
      title: 'Global Impact',
      description: 'Reached 1 million active users and expanded internationally.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
  {/* Hero Section */}
  <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        About CivicConnect
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        Empowering communities to create positive change through technology, 
        transparency, and collaborative problem-solving.
      </p>
      <div className="flex justify-center">
        <img 
          src="https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Community collaboration"
          className="rounded-lg shadow-2xl max-w-2xl w-full"
        />
      </div>
    </div>
  </section>

  {/* Mission Section */}
  <section className="py-16 bg-gray-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-xl text-gray-300">
          To bridge the gap between citizens and government through technology, 
          creating stronger, more responsive communities where every voice matters.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-orange-500 mb-4">What We Do</h3>
          <p className="text-gray-300">
            CivicConnect provides a digital platform that enables citizens to report 
            community issues, track their progress, and engage with local authorities. 
            We make civic participation accessible, transparent, and effective.
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Why We Do It</h3>
          <p className="text-gray-300">
            We believe that healthy democracies require active citizen participation. 
            By providing tools for better communication and collaboration, we help 
            build stronger communities and more responsive governments.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Values Section */}
  <section className="py-16 bg-gray-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
        <p className="text-xl text-gray-400">
          The principles that guide everything we do
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Achievements Section */}
  <section className="py-16 bg-gray-800">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
        <p className="text-xl text-gray-300">
          Real numbers that show our commitment to communities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">{achievement.number}</div>
            <div className="text-lg font-semibold text-white mb-2">{achievement.label}</div>
            <div className="text-gray-400">{achievement.description}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Team Section */}
  <section className="py-16 bg-gray-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
        <p className="text-xl text-gray-400">
          The passionate people behind CivicConnect
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-orange-500 font-medium mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Timeline Section */}
  <section className="py-16 bg-gray-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
        <p className="text-xl text-gray-300">
          Key milestones in our mission to improve communities
        </p>
      </div>
      
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
              </div>
              <p className="text-gray-400">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Contact Section */}
  <section className="py-16 bg-black text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-xl text-gray-400">
          Have questions or want to learn more about CivicConnect?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-orange-500" />
              <span>hello@civicconnect.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-orange-500" />
              <span>1-800-CIVIC-CONNECT</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>123 Democracy Street, Civic City, CC 12345</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-black px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default AboutPage;