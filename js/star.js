ebi = new Array();
ebi[0] = new Array(2, 0, 0, 0, 0, 20, 0, 10, "./images/img1.png");
ebi[1] = new Array(2, 0, 0, 0, 0, 20, 0, 10, "./images/img2.png");
ebi[2] = new Array(2, 0, 0, 0, 0, 20, 0, 10, "./images/img3.png");
ebi[3] = new Array(2, 0, 0, 0, 0, 20, 0, 10, "./images/img4.png");
let no = 4;
let hsw = -1;
let srl = 1;
let chg = 100;

let off_w, off_h, doc_x, doc_y, dx, dy;
dgr = new Array();
xza = new Array();
yza = new Array();
amp = new Array();
stx = new Array();
sty = new Array();
kaku = new Array();
sdg = new Array();
muki = new Array();
img_w = new Array();
img_h = new Array();
marg_t = new Array();
marg_l = new Array();
disp_w = new Array();
disp_h = new Array();
Gy = new Array();
Gx = new Array();
Gp = new Array();

//  初期値の設定
ingN = 0;
dpsw = 1;
prima = -1;
for (i = 0; i < no; i++) {
  Gy[i] = ingN;
  Gx[i] = ebi[ingN].length;
  Gp[i] = 8;
  document.write(
    "<div id='dot" +
      i +
      "' style='position:absolute; z-index:-1; animation: spn 3s linear infinite;'>" +
      "<img src='" +
      ebi[ingN][8] +
      "' id='img" +
      i +
      "'></div>"
  );
  dgr[i] = Math.random() * 6.24;
  muki[i] = ebi[ingN][0];
  marg_t[i] = ebi[ingN][1];
  marg_l[i] = ebi[ingN][2];
  disp_w[i] = ebi[ingN][3];
  disp_h[i] = ebi[ingN][4];
  prim(i);
  xza[i] = marg_l[i] + Math.random() * (disp_w[i] - img_w[i]);
  yza[i] = marg_t[i] + Math.random() * (disp_h[i] - img_h[i]);
  if (ingN == ebi.length - 1) {
    ingN = 0;
  } else {
    ingN += 1;
  }
}
Zahyo();

// メインルーチン
function Zahyo() {
  brSize();
  for (i = 0; i < no; ++i) {
    dgr[i] += sdg[i];
    ddx = Math.sin(kaku[i]);
    ddy = Math.cos(kaku[i]);
    if (muki[i] == 1 || muki[i] == 3) {
      ddx = -ddx;
    }
    dx = amp[i] * Math.sin(dgr[i]) * ddx;
    dy = amp[i] * Math.sin(dgr[i]) * ddy;
    xza[i] += stx[i];
    yza[i] += sty[i];
    if (
      xza[i] + dx > marg_l[i] + disp_w[i] - img_w[i] ||
      xza[i] + dx < marg_l[i] ||
      yza[i] + dy > marg_t[i] + disp_h[i] - img_h[i] ||
      yza[i] + dy < marg_t[i]
    ) {
      prim(i);
      if (muki[i] == 0) {
        if (Math.random() < 0.5) {
          st_3(i);
        } else {
          st_4(i);
        }
      }
      if (muki[i] == 1) {
        if (Math.random() < 0.5) {
          st_2(i);
        } else {
          st_3(i);
        }
      }
      if (muki[i] == 2) {
        if (Math.random() < 0.5) {
          st_1(i);
        } else {
          st_2(i);
        }
      }
      if (muki[i] == 3) {
        if (Math.random() < 0.5) {
          st_1(i);
        } else {
          st_4(i);
        }
      }
    }

    Disp("dot" + i, off_w + xza[i] + dx, off_h + yza[i] + dy);
  }
  setTimeout("Zahyo()", 1000 / chg);
}

// スタート位置
function st_1(u) {
  xza[u] = marg_l[u] + Math.random() * (disp_w[u] - img_w[u]);
  yza[u] = marg_t[u];
  if (dy < 0) {
    yza[u] += dy;
  }
} // 上辺
function st_2(u) {
  xza[u] = marg_l[u] + disp_w[u] - img_w[u];
  if (dx > 0) {
    xza[u] -= dx;
  }
  yza[u] = marg_t[u] + Math.random() * (disp_h[u] - img_h[u]);
} // 右辺
function st_3(u) {
  xza[i] = marg_l[u] + Math.random() * (disp_w[u] - img_w[u]);
  yza[i] = marg_t[u] + disp_h[u] - img_h[u];
  if (dy > 0) {
    yza[u] -= dy;
  }
} // 下辺
function st_4(u) {
  xza[i] = marg_l[u];
  if (dx < 0) {
    xza[u] += dx;
  }
  yza[i] = marg_t[u] + Math.random() * (disp_h[u] - img_h[u]);
} // 左辺

// 初期データ発生
function prim(i) {
  brSize();
  if (hsw > 0) {
    if (prima > 0 && i == 0) {
      if (dpsw > 0) {
        visi = "hidden";
        dpsw = -1;
      } else {
        visi = "visible";
        dpsw = 1;
      }
      for (k = 1; k < no; k++) {
        document.getElementById("dot" + k).style.visibility = visi;
      }
    }
  }
  prima = 1;

  document.getElementById("img" + i).src = ebi[Gy[i]][Gp[i]];
  Gp[i]++;
  if (Gp[i] >= Gx[i]) {
    Gp[i] = 8;
  }
  img_h[i] = document.getElementById("img" + i).height;
  img_w[i] = document.getElementById("img" + i).width;
  if (disp_w[i] == 0) {
    disp_w[i] = doc_x - marg_l[i];
  }
  if (disp_h[i] == 0) {
    disp_h[i] = doc_y - marg_t[i];
  }
  kaku[i] = 0.44 + Math.random() * 0.69;
  amp[i] = (0.2 + Math.random() * 0.8) * ebi[Gy[i]][6];
  sdg[i] = ((0.3 + Math.random()) * ebi[Gy[i]][7]) / 100;
  stz = ((0.7 + Math.random()) * ebi[Gy[i]][5]) / 10;
  if (muki[i] == 0 || muki[i] == 3) {
    stx[i] = Math.cos(kaku[i]) * stz;
  } else {
    stx[i] = -Math.cos(kaku[i]) * stz;
  }
  if (muki[i] == 2 || muki[i] == 3) {
    sty[i] = Math.sin(kaku[i]) * stz;
  } else {
    sty[i] = -Math.sin(kaku[i]) * stz;
  }
}

// ブラウザのサイズを調べる
function brSize() {
  if (document.getElementById) {
    doc_x = document.body.clientWidth;
    doc_y = document.body.clientHeight;
    off_w = document.body.scrollLeft;
    off_h = document.body.scrollTop;
  }
  if (srl < 0) {
    off_w = 0;
    off_h = 0;
  }
}

// 画像を移動する
function Disp(num, xx, yy) {
  document.getElementById(num).style.left = xx + "px";
  document.getElementById(num).style.top = yy + "px";
}
