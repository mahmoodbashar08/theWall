import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../lib/auth";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const telegramWebApp = window.Telegram.WebApp;

      telegramWebApp.BackButton.show();
      const backButtonHandler = () => {
        navigate("/home");
      };

      telegramWebApp.onEvent("backButtonClicked", backButtonHandler);

      // Cleanup function to remove the event listener
      return () => {
        telegramWebApp.offEvent("backButtonClicked", backButtonHandler);
        telegramWebApp.BackButton.hide();
      };
    }
  }, []);

  const getInitials = (name: any) => {
    // Get the first letter of the username
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 relative flex flex-col h-screen overflow-hidden">
      {/* Profile Section - Fixed at Top */}
      <div className="p-6 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
              {getInitials(user?.username)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.username}</h2>
              <div className="flex items-center text-sm text-gray-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mx-4">
        <Button
          onClick={() => navigate("/myProfile/messages")}
          className="text-lg font-semibold text-white w-[50%] rounded-r-none border-none border-l-0"
        >
          Messages
        </Button>
        <Button
          onClick={() => navigate("/myProfile/friends")}
          className="text-lg font-semibold text-white w-[50%] rounded-l-none border-none border-r-0"
        >
          Friends
        </Button>
      </div>

      {/* Dynamic Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MyProfile;
