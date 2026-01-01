import logo from "../assets/logo3.png";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      {/* White line above footer */}
      <div className="w-full h-px bg-white/30" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Mordev logo"
                className="w-7 h-7 object-contain"
              />
              <span className="text-white font-semibold text-lg">
                Mordev
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              20619 Torrence Chapel Rd <br />
              Suite 116 #1040 <br />
              Cornelius, NC 28031 <br />
              United States
            </p>

            <div className="mt-4 text-sm space-y-1">
              <p>
                Phone number <br />
                <span className="text-white">1-800-201-1019</span>
              </p>
              <p>
                Email <br />
                <span className="text-white">
                  support@mordev.com
                </span>
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About us</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Contact us</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-medium mb-4">Social</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Facebook</li>
              <li className="hover:text-white cursor-pointer">Instagram</li>
              <li className="hover:text-white cursor-pointer">LinkedIn</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
              <li className="hover:text-white cursor-pointer">Youtube</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Terms of service</li>
              <li className="hover:text-white cursor-pointer">Privacy policy</li>
              <li className="hover:text-white cursor-pointer">Cookie policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-gray-500">
          © 2026 Mordev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
