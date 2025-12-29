import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Users, TrendingUp, MapPin, Briefcase, Star, CheckCircle2, MessageSquare, Bell, Mail, Phone, Linkedin, Twitter, Facebook, Instagram, Shield, Clock, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-office.jpg";
import { motion } from "framer-motion";

const Landing = () => {
  const featuredJobs = [
    {
      title: "Senior Software Engineer",
      company: "TCS Chennai",
      location: "Anna Nagar, Chennai",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "5-8 years",
    },
    {
      title: "Product Manager",
      company: "Freshworks",
      location: "OMR, Chennai",
      type: "Full-time",
      salary: "₹18-25 LPA",
      experience: "6-10 years",
    },
    {
      title: "UI/UX Designer",
      company: "Zoho Corporation",
      location: "Velachery, Chennai",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "3-5 years",
    },
  ];

  const stats = [
    { icon: Building2, label: "Companies", value: "500+" },
    { icon: Briefcase, label: "Active Jobs", value: "2,500+" },
    { icon: Users, label: "Candidates", value: "50,000+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find Your Dream Job in{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Chennai
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore verified opportunities curated by ACE FINS TECH.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity rounded-2xl">
                    View Jobs <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="rounded-2xl">
                    Login / Register
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Modern office in Chennai"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">500+ Companies</p>
                    <p className="text-sm text-muted-foreground">Trust ACE FINS TECH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-0 hover:scale-105 transition-transform">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Jobs in Chennai</h2>
            <p className="text-xl text-muted-foreground">
              Handpicked opportunities from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <Card key={index} className="glass-card border-0 hover:shadow-xl transition-all group">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-lg font-semibold text-primary">{job.salary}</span>
                    <Link to="/login">
                      <Button size="sm" variant="ghost" className="group-hover:bg-primary/10">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button size="lg" variant="outline">
                View All Jobs <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">About ACE FINS TECH</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">Mission:</strong> To connect talented professionals with exceptional career opportunities in Chennai and across Tamil Nadu. We bridge the gap between ambitious candidates and forward-thinking companies.
                </p>
                <p className="text-lg">
                  <strong className="text-foreground">Vision:</strong> To become Chennai's most trusted recruitment platform, empowering careers and transforming the hiring landscape through technology and personalized service.
                </p>
                <div className="mt-6 p-6 bg-secondary/50 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Office Location</p>
                      <p className="text-muted-foreground">ACE FINS TECH</p>
                      <p className="text-muted-foreground">T Nagar, Chennai, Tamil Nadu</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-2xl font-bold mb-1">500+</p>
                    <p className="text-sm text-muted-foreground">Companies</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-2xl font-bold mb-1">50K+</p>
                    <p className="text-sm text-muted-foreground">Candidates</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-2xl font-bold mb-1">2.5K+</p>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-2xl font-bold mb-1">95%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose ACE FINS TECH?</h2>
            <p className="text-xl text-muted-foreground">
              Your trusted recruitment partner in Chennai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Verified Roles",
                description: "All job postings are verified and authentic",
              },
              {
                icon: Headphones,
                title: "Interview Support",
                description: "Get personalized guidance for your interviews",
              },
              {
                icon: MessageSquare,
                title: "HR Chat Access",
                description: "Direct communication with HR professionals",
              },
              {
                icon: Clock,
                title: "Real-time Updates",
                description: "Instant notifications on application status",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="apple-card border-0 h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Candidates Say</h2>
            <p className="text-xl text-muted-foreground">
              Stories from Chennai professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                location: "Chennai, Tamil Nadu",
                role: "Software Engineer at TCS",
                content: "ACE FINS TECH helped me land my dream job in Anna Nagar. The team was incredibly supportive throughout the process.",
                rating: 5,
              },
              {
                name: "Rajesh Kumar",
                location: "Chennai, Tamil Nadu",
                role: "Product Manager at Freshworks",
                content: "The interview support and real-time updates made my job search seamless. Highly recommend!",
                rating: 5,
              },
              {
                name: "Meera Nair",
                location: "Chennai, Tamil Nadu",
                role: "UI/UX Designer at Zoho",
                content: "Found my perfect role in Velachery through ACE FINS TECH. The HR chat feature was a game-changer.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card border-0 h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-6 h-6" />
                <span className="text-xl font-bold">ACE FINS TECH</span>
              </div>
              <p className="text-background/80 text-sm mb-4">
                Your trusted recruitment partner in Chennai, Tamil Nadu
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link to="/jobs" className="hover:text-background transition-colors">Browse Jobs</Link></li>
                <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
                <li><Link to="/login" className="hover:text-background transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-background transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>T Nagar, Chennai, Tamil Nadu</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 44 1234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@acefinstech.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link to="/admin/login" className="hover:text-background transition-colors">Admin Login</Link></li>
                <li><a href="#" className="hover:text-background transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
            <p>© 2025 ACE FINS TECH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
