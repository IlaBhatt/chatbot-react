

interface Message {
    chat_order: number;
    message_type: string;
    message: string;
}


interface Chat {
    user_id: number;
    chat_id: number;
    messages: Message[];
}

export const dummyChats: Chat[] = [
    {
        user_id: 777,
        chat_id: 1,
        messages: [
            {
                chat_order: 1,
                message_type: 'ai',
                message: 'Hello! How can I assist you today?',
            },
            {
                chat_order: 2,
                message_type: 'user',
                message: 'What is the weather like today?',
            },
            {
                chat_order: 3,
                message_type: 'ai',
                message: 'The weather is sunny with a high of 25°C.',
            },
        ],
    },
    {
        user_id: 777,
        chat_id: 2,
        messages: [
            {
                chat_order: 1,
                message_type: 'ai',
                message: 'Hi there! How can I help you?',
            },
            {
                chat_order: 2,
                message_type: 'user',
                message: 'Tell me a joke.',
            },
            {
                chat_order: 3,
                message_type: 'ai',
                message: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
            },
        ],
    },
    {
        user_id: 777,
        chat_id: 3,
        messages: [
            {
                chat_order: 1,
                message_type: 'ai',
                message: 'Welcome back! What would you like to know?',
            },
            {
                chat_order: 2,
                message_type: 'user',
                message: 'Give me some tips for healthy eating.',
            },
            {
                chat_order: 3,
                message_type: 'ai',
                message: 'Eat more fruits and vegetables, stay hydrated, and limit processed foods.',
            },
        ],
    },
    {
        user_id: 777,
        chat_id: 4,
        messages: [
            {
                chat_order: 1,
                message_type: 'ai',
                message: 'Hello! How can I help you today?',
            },
            {
                chat_order: 2,
                message_type: 'user',
                message: 'What are the latest tech trends?',
            },
            {
                chat_order: 3,
                message_type: 'ai',
                message: 'AI, machine learning, and 5G are among the latest tech trends.',
            },
        ],
    },
    {
        user_id: 777,
        chat_id: 5,
        messages: [
            {
                chat_order: 1,
                message_type: 'ai',
                message: 'Hi! What’s on your mind?',
            },
            {
                chat_order: 2,
                message_type: 'user',
                message: 'How can I improve my coding skills?',
            },
            {
                chat_order: 3,
                message_type: 'ai',
                message: 'Practice regularly, work on projects, and learn from others.',
            },
        ],
    },
];
