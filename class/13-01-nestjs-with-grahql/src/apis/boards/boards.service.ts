import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
    findAll() {
        console.log('find All');
        return [
            { num: 1, writer: 'feynman', title: 'story', contents: 'joke' },
            { num: 2, writer: 'feynman', title: 'story', contents: 'joke' },
            { num: 3, writer: 'feynman', title: 'story', contents: 'joke' },
            { num: 4, writer: 'feynman', title: 'story', contents: 'joke' },
        ];
    }

    create() {
        console.log('create');
        return 'create successful';
    }
}
