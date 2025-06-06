// AppRoutes.tsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import SinglePost from './pages/SinglePost'
import CreatePost from './pages/CreatePost'
import Ranking from './pages/Ranking'
import MeetBack from './pages/MeetBack'
import Notifications from './pages/Notifications'
import { LogsViewer } from './pages/LogsViewer'
import ListFollow from './pages/ListFollow'
import ListRatings from './pages/ListRatings'
import ListPosts from './pages/ListPosts'
import ProfileMe from './pages/ProfileMe'
import Profile from './pages/Profile'
import PrivateMsg from './pages/PrivateMsg'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/feed" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path="/profile" element={
                <PrivateRoute>
                    <ProfileMe />
                </PrivateRoute>
            } />
            <Route path="/profile/:id" element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
            <Route path="/posts/:id" element={
                <PrivateRoute>
                    <ListPosts />
                </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<SinglePost />} />
            {/* CreatePost */}
            <Route path="/post/create" element={
                <PrivateRoute>
                    <CreatePost />
                </PrivateRoute>
            } />
            {/* Seguidores o seguidos */}
            <Route path="/follow/:key/:id" element={
                <PrivateRoute>
                    <ListFollow />
                </PrivateRoute>
            } />
            {/* Ratings */}
            <Route path="/ratings/:id" element={
                <PrivateRoute>
                    <ListRatings />
                </PrivateRoute>
            } />
            <Route path="/ranking" element={
                <PrivateRoute>
                    <Ranking />
                </PrivateRoute>
            } />
            <Route path="/" element={
                <PrivateRoute>
                    <MeetBack />
                </PrivateRoute>
            } />
            <Route path="/notifications" element={
                <PrivateRoute>
                    <Notifications />
                </PrivateRoute>
            } />
            <Route path="/private-msg" element={
                <PrivateRoute>
                    <PrivateMsg />
                </PrivateRoute>
            } />
            <Route path="/logs" element={
                <PrivateRoute adminOnly>
                    <LogsViewer />
                </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}