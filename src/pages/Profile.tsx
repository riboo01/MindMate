import React, { useState } from 'react';
import { useAuth, User } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { User as UserIcon, Mail, Camera, Save, X } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { moodEntries, clearChat } = useMood();
  
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!user || !updatedUser) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setEditMode(false);
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

  const cancelEdit = () => {
    setUpdatedUser(user);
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences.
        </p>
      </div>

      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
          Your profile has been updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={cancelEdit}
                    className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpdateProfile}
                    className="btn btn-primary flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save size={16} className="mr-1" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      {updatedUser.avatar ? (
                        <img 
                          src={updatedUser.avatar} 
                          alt={updatedUser.name} 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <UserIcon size={40} className="text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white"
                      >
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      value={updatedUser.name}
                      onChange={(e) => setUpdatedUser({...updatedUser, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      value={updatedUser.email}
                      onChange={(e) => setUpdatedUser({...updatedUser, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex justify-center mb-6">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <UserIcon size={40} className="text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <UserIcon size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-4">App Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive reminders to track your mood
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium">Data Privacy</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Store all data locally on your device only
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Your Stats</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total mood entries</p>
                <p className="text-xl font-bold">{moodEntries.length}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account created</p>
                <p className="font-medium">May 15, 2023</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last login</p>
                <p className="font-medium">Today</p>
              </div>
            </div>
          </div>
          
          <div className="card mb-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
            <h2 className="text-lg font-semibold mb-4">Data Management</h2>
            
            <div className="space-y-4">
              <button 
                onClick={clearChat}
                className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white w-full"
              >
                Clear Chat History
              </button>
              
              <button className="btn bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 w-full">
                Delete All Mood Entries
              </button>
              
              <button className="btn bg-red-600 hover:bg-red-700 text-white w-full">
                Delete Account
              </button>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white w-full"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;