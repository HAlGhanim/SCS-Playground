export class EmployerList {
  private enrolled_employer_list = [
    '3001575',
    '3000340',
    '3000331',
    '3000145',
    '3000196',
    '3000536',
    '3000510',
    '3000170',
    '3000153',
    '3005694',
    '3180054',
  ];

  public exists(regNum: string) {
    return this.enrolled_employer_list.find(function (r) {
      return regNum == r;
    });
  }
}
