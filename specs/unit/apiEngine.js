import chai from 'chai';
import ApiEngine from '../../build/common/utils/ApiEngine';
let expect = chai.expect;

describe('#ApiEngine', () => {
  let apiEngine = new ApiEngine();
  it('should provide http verb methods', () => {
    expect(apiEngine.get).to.be.a('function');
    expect(apiEngine.post).to.be.a('function');
    expect(apiEngine.put).to.be.a('function');
    expect(apiEngine.patch).to.be.a('function');
    expect(apiEngine.del).to.be.a('function');
  });
});
