import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

// 파일을 타입스크립트에서 읽기위해서 인터페이스 제작
interface IFile {
  file: FileUpload;
}
interface IFiles {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ file }: IFile) {
    // Storage로 file 설정
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILE,
      projectId: 'classproject-347010',
    })
      .bucket('codecamp_file_storage')
      .file(file.filename);
    //promise로 만들기 (await 사용하기 위함)
    const resultURL = await new Promise((resolve, reject) => {
      // Read the file, 부차적인 작업들은 pipe로 실행, on으로 작업 결과 값 가져옴
      file
        .createReadStream()
        .pipe(storage.createWriteStream({ resumable: false }))
        .on('finish', () => {
          resolve(`codecamp_file_storage/${file.filename}`);
        })
        .on('error', () => {
          reject('upload failure.....🧐');
        });
    });
    // return image URL
    return resultURL;
  }

  async uploadMany({ files }: IFiles) {
    const storage = new Storage({
      keyFilename: 'classproject-storage.json',
      projectId: 'classproject-347010',
    }).bucket('codecamp_file_storage');

    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      waitedFiles.map((e) => {
        return new Promise((resolve, reject) => {
          e.createReadStream()
            .pipe(
              storage.file(e.filename).createWriteStream({ resumable: false }),
            )
            .on('finish', () => resolve(`codecamp_file_storage/${e.filename}`))
            .on('error', () => reject('upload failure.....🧐'));
        });
      }),
    );
    return results;
  }
}

// 여러파일을 동시에 업로드하려면 어떻게 해야할까?
// for문 : 순서가 정해지고 먼저 업로드하는게 완료되지 않을 경우 뒤 순서도 무한대기
// https://storage.googleapis.com/codecamp_file_storage/
// GCP 내부 함수를 통해 섬네일 트리거와 같이 작업을 GCP에서 처리할 수 있다
