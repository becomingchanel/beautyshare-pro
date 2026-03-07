'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface Task {
  id: string;
  title: string;
  category: 'Marketing' | 'Operations' | 'Finance' | 'Product';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueTime: string;
  duration: string;
  completed: boolean;
}

interface WeeklyGoal {
  id: string;
  title: string;
  progress: number;
}

const DEMO_TASKS: Task[] = [
  { id: '1', title: 'Review Q2 Marketing Budget', category: 'Finance', priority: 'urgent', dueTime: '9:00 AM', duration: '45 min', completed: false },
  { id: '2', title: 'Approve New Product Line Launch', category: 'Product', priority: 'urgent', dueTime: '10:30 AM', duration: '60 min', completed: false },
  { id: '3', title: 'Strategy Call with Sales Team', category: 'Operations', priority: 'urgent', dueTime: '2:00 PM', duration: '30 min', completed: true },
  { id: '4', title: 'Update Brand Guidelines', category: 'Marketing', priority: 'high', dueTime: '11:00 AM', duration: '90 min', completed: false },
  { id: '5', title: 'Respond to Client Feedback', category: 'Product', priority: 'high', dueTime: '3:30 PM', duration: '45 min', completed: false },
  { id: '6', title: 'Review Q1 Financial Reports', category: 'Finance', priority: 'high', dueTime: '4:00 PM', duration: '120 min', completed: false },
  { id: '7', title: 'Schedule Team Performance Reviews', category: 'Operations', priority: 'medium', dueTime: '1:00 PM', duration: '30 min', completed: false },
  { id: '8', title: 'Plan Content Calendar for June', category: 'Marketing', priority: 'high', dueTime: '2:30 PM', duration: '75 min', completed: false },
  { id: '9', title: 'Analyze Competitor Pricing', category: 'Finance', priority: 'medium', dueTime: '10:00 AM', duration: '60 min', completed: true },
  { id: '10', title: 'Vendor Selection Meeting', category: 'Operations', priority: 'medium', dueTime: '11:30 AM', duration: '45 min', completed: false },
  { id: '11', title: 'Draft Monthly Newsletter', category: 'Marketing', priority: 'low', dueTime: '3:00 PM', duration: '60 min', completed: false },
  { id: '12', title: 'Update SaaS Roadmap', category: 'Product', priority: 'high', dueTime: '9:30 AM', duration: '90 min', completed: false },
  { id: '13', title: 'Approve Payroll', category: 'Finance', priority: 'urgent', dueTime: '5:00 PM', duration: '30 min', completed: false },
  { id: '14', title: 'Team Standup', category: 'Operations', priority: 'medium', dueTime: '9:00 AM', duration: '20 min', completed: true },
  { id: '15', title: 'Customer Success Review', category: 'Product', priority: 'high', dueTime: '4:30 PM', duration: '60 min', completed: false },
];

const WEEKLY_GOALS: WeeklyGoal[] = [
  { id: 'g1', title: 'Close 3 New Enterprise Deals', progress: 67 },
  { id: 'g2', title: 'Complete Team Training Program', progress: 85 },
  { id: 'g3', title: 'Launch New Feature Beta', progress: 45 },
  { id: 'g4', title: 'Attend 5 Industry Networking Events', progress: 60 },
  { id: 'g5', title: 'Reduce Customer Churn Rate by 2%', progress: 72 },
];

export default function CEOPlanner() {
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [newTask, setNewTask] = useState({ title: '', category: 'Marketing' as const, priority: 'medium' as const, dueDate: '' });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        category: newTask.category,
        priority: newTask.priority,
        dueTime: '2:00 PM',
        duration: '45 min',
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', category: 'Marketing', priority: 'medium', dueDate: '' });
    }
  };

  const tasksDueToday = tasks.filter(t => !t.completed).length;
  const overdue = 2;
  const completedThisWeek = tasks.filter(t => t.completed).length;
  const weeklyGoalProgress = Math.round((WEEKLY_GOALS.reduce((sum, g) => sum + g.progress, 0) / (WEEKLY_GOALS.length * 100)) * 100);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Marketing': return 'bg-purple-100 text-purple-700';
      case 'Operations': return 'bg-blue-100 text-blue-700';
      case 'Finance': return 'bg-green-100 text-green-700';
      case 'Product': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const priorityMatrix = {
    urgentImportant: tasks.filter(t => t.priority === 'urgent'),
    importantNotUrgent: tasks.filter(t => t.priority === 'high'),
    urgentNotImportant: tasks.filter(t => t.priority === 'medium'),
    neither: tasks.filter(t => t.priority === 'low'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CEO Task Planner</h1>
          <p className="text-gray-600">Manage your beauty business priorities and strategic focus</p>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Tasks Due Today" value={tasksDueToday.toString()} subtext="tasks to complete" />
          <MetricCard label="Overdue" value={overdue.toString()} subtext="need attention" />
          <MetricCard label="Completed This Week" value={completedThisWeek.toString()} subtext="tasks finished" />
          <MetricCard label="Weekly Goal Progress" value={`${weeklyGoalProgress}%`} subtext="on track" />
        </div>

        {/* Priority Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Urgent + Important */}
          <Card className="bg-red-50 border-red-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4">🔴 Urgent & Important</h3>
              <div className="space-y-2">
                {priorityMatrix.urgentImportant.map(task => (
                  <div key={task.id} className="bg-white rounded p-3 text-sm">
                    <div className="font-semibold text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-600 mt-1">Due: {task.dueTime}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-red-700">{priorityMatrix.urgentImportant.length} tasks</div>
            </div>
          </Card>

          {/* Important + Not Urgent */}
          <Card className="bg-blue-50 border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">🔵 Important & Not Urgent</h3>
              <div className="space-y-2">
                {priorityMatrix.importantNotUrgent.map(task => (
                  <div key={task.id} className="bg-white rounded p-3 text-sm">
                    <div className="font-semibold text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-600 mt-1">Due: {task.dueTime}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-blue-700">{priorityMatrix.importantNotUrgent.length} tasks</div>
            </div>
          </Card>

          {/* Urgent + Not Important */}
          <Card className="bg-yellow-50 border-yellow-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">🟡 Urgent & Not Important</h3>
              <div className="space-y-2">
                {priorityMatrix.urgentNotImportant.map(task => (
                  <div key={task.id} className="bg-white rounded p-3 text-sm">
                    <div className="font-semibold text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-600 mt-1">Due: {task.dueTime}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-yellow-700">{priorityMatrix.urgentNotImportant.length} tasks</div>
            </div>
          </Card>

          {/* Neither */}
          <Card className="bg-gray-50 border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚪ Neither Urgent nor Important</h3>
              <div className="space-y-2">
                {priorityMatrix.neither.map(task => (
                  <div key={task.id} className="bg-white rounded p-3 text-sm">
                    <div className="font-semibold text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-600 mt-1">Due: {task.dueTime}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-gray-700">{priorityMatrix.neither.length} tasks</div>
            </div>
          </Card>
        </div>

        {/* Today's Focus List */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Focus List</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks
                .filter(t => !t.completed)
                .sort((a, b) => {
                  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map(task => (
                  <div
                    key={task.id}
                    className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-pink-600 cursor-pointer"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className={`font-semibold text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                        <Badge className={getCategoryColor(task.category)}>
                          {task.category}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📅 {task.dueTime}</span>
                        <span>⏱️ {task.duration}</span>
                        <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>

        {/* Weekly Goals Card */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Goals</h2>
            <div className="space-y-4">
              {WEEKLY_GOALS.map(goal => (
                <div key={goal.id}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                    <span className="text-sm font-bold text-pink-600">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Add Task Form */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Add Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Product">Product</option>
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <button
                onClick={addTask}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
